import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GuiControl, GuiFieldType, GuiFields, GuiTabsMode } from './interface';

@Component({
  selector: 'gui-form',
  templateUrl: './gui-form.html',
  styleUrls: ['./gui-form.scss'],
  host: {
    class: 'gui-form',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiForm implements OnChanges, OnInit, OnDestroy {
  /**
   * The form instance which allow to track model value and validation status.
   */
  @Input() form = new FormGroup<any>({});

  /**
   * The field configurations for building the form.
   */
  @Input() config: GuiFields = {};

  /**
   * The model to be represented by the form.
   */
  @Input() model: any = {};

  /**
   * Fired on model value change
   */
  @Output() modelChange = new EventEmitter();

  formFields: GuiControl[] = [];

  formSubscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.form.controls = {}; // reset controls
      this.formFields = this.getFormFieldArray(this.form, this.config, this.model);
    }

    if (changes['model'] && this.model && Object.keys(this.model).length > 0) {
      this.form.patchValue(this.model);
    }
  }

  ngOnInit(): void {
    this.formSubscription = this.form.valueChanges.subscribe(value => {
      Object.assign(this.model, value);
      this.modelChange.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * Convert the object config to array config and register into the reactive form.
   *
   * @param form         The reactive form instance
   * @param config       The config of the form fields
   * @param model        The value of the form control
   * @param defaultValue The default value of the form field
   * @param parentType   The type of the form field parent
   * @param options      The reactive form options
   * @returns
   */
  getFormFieldArray(
    form: FormGroup | FormArray,
    config: GuiFields | GuiControl[] = {},
    model: Record<string, any> = {},
    defaultValue: any = null,
    parentType: GuiFieldType = 'group',
    options: { onlySelf?: boolean; emitEvent?: boolean } = { emitEvent: false }
  ) {
    const tempArr = [];

    for (const key of Object.keys(config)) {
      // Inferring the form type by the data type of `children`
      // 1. `undefined` => FormControl
      // 2. `array`     => FormArray
      // 3. `object`    => FormGroup
      const _children = (config as any)[key].template ? [] : (config as any)[key].children;
      const _type = !_children ? 'control' : Array.isArray(_children) ? 'array' : 'group';

      const item: GuiControl = {
        _type,
        key,
        parentType,
        model: model[key],
        default: defaultValue?.[key],
        index: Number(key), // the string key will be `NaN`
        ...(config as any)[key],
      };

      // The `group` type generally have no `default`, so we should
      // set the default value manually
      if (item.children && model[key] == null && item.default == null) {
        item.model = model[key] = item._type === 'array' ? [] : {};
      }

      // Generate model by the `default` key of the field config
      if (typeof model === 'object' && model[key] == null) {
        model[key] = item.default;
      }

      // Special judgment on `tabs` type, the `children` key will be ignored if
      // there has a `template` key
      if (item.template) {
        // If model is an array and not empty, the default value of the form field
        // will use the model's value
        if (Array.isArray(item.model) && item.model.length > 0) {
          item.default = item.model;
        }
        if (item.default?.length) {
          item.children = item.default.map((value: any) => {
            Object.assign(value, item.template?.default);
            return {
              default: value,
              ...item.template,
            };
          });
        } else {
          item.children = [];
        }
      }

      if (item._type === 'control') {
        const formState = { value: item.default, disabled: item.disabled };
        if (form instanceof FormGroup) {
          form.registerControl(item.key, new FormControl(formState));
        } else if (form instanceof FormArray) {
          form.insert(item.index || form.length, new FormControl(formState), options);
        }
      } else if (item._type === 'array') {
        let formArray = new FormArray<any>([]);
        if (form instanceof FormGroup) {
          formArray = form.registerControl(item.key, new FormArray([])) as FormArray;
        } else if (form instanceof FormArray) {
          form.insert(item.index || form.length, formArray, options);
        }

        item.children = this.getFormFieldArray(
          formArray,
          item.children,
          item.model,
          item.default,
          item.type
        );
      } else if (item._type === 'group') {
        let formGroup = new FormGroup({});
        if (form instanceof FormGroup) {
          formGroup = form.registerControl(item.key, new FormGroup({})) as FormGroup;
        } else if (form instanceof FormArray) {
          form.insert(item.index || form.length, formGroup, options);
        }

        item.children = this.getFormFieldArray(
          formGroup,
          item.children,
          item.model,
          item.default,
          item.type
        );
      }

      tempArr.push(item);
    }

    return tempArr;
  }

  /**
   * Add a tab item.
   *
   * @param e     The mouse event
   * @param form  The reactive form instance
   * @param tabs  The config of the tabs field
   * @param index The index of the tabs array
   */
  addTab(e: MouseEvent, form: FormArray, tabs: GuiControl, index?: number) {
    e.stopPropagation();
    const insertIndex = index === void 0 ? tabs.children!.length : index + 1;
    // Save the index of the insertion in the config
    tabs.template!.index = insertIndex;
    // The key in the object and the index in the array should be the same
    tabs.children!.forEach((child, index) => {
      if (index >= insertIndex) {
        child.index! += 1;
        child.key = child.index!.toString();
      }
    });
    // The constructed object looks like this `[{ key: 'tab', children: template }]`
    // The key should preferably be `null`
    const newTab = this.getFormFieldArray(
      form,
      { [insertIndex]: tabs.template } as GuiFields,
      {},
      null,
      'tabs',
      { emitEvent: true }
    );
    tabs.children!.splice(insertIndex, 0, newTab[0]);
  }

  /**
   * Remove a tab item.
   *
   * @param e     The mouse event
   * @param form  The reactive form instance
   * @param tabs  The config of the tabs field
   * @param index The index of the tabs array
   */
  removeTab(e: MouseEvent, form: FormArray, tabs: GuiControl, index?: number) {
    e.stopPropagation();
    const removeIndex = index === void 0 ? tabs.children!.length - 1 : index;
    tabs.children!.forEach((child, index) => {
      if (index > removeIndex) {
        child.index! -= 1;
        child.key = child.index!.toString();
      }
    });
    tabs.children!.splice(removeIndex, 1);
    form.removeAt(removeIndex);
  }

  /**
   * Change the display mode of tabs.
   *
   * @param e    The mouse event
   * @param tabs The config of the tabs field
   * @param mode The display mode of tabs
   */
  changeTabsMode(e: MouseEvent, tabs: GuiControl, mode?: GuiTabsMode) {
    e.stopPropagation();
    tabs.mode = mode;
  }
}
