import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { Subscription, mergeWith, of } from 'rxjs';

import { GuiButtonToggle } from './button-toggle/button-toggle';
import { GuiCodearea } from './codearea/codearea';
import { GuiCombobox } from './combobox/combobox';
import { GuiFieldGroup } from './field-group/field-group';
import { GuiFieldLabel } from './field-label/field-label';
import { GuiFileUploader } from './file-uploader/file-uploader';
import { GuiFill } from './fill/fill';
import { GuiEjsPipe, GuiFlexDirective, compareValues, getValueByPath } from './gui-utils';
import { GuiIconButtonWrapper } from './icon-button-wrapper/icon-button-wrapper';
import { GuiImageSelect } from './image-select/image-select';
import { GuiInlineGroup } from './inline-group/inline-group';
import { GuiInputNumber } from './input-number/input-number';
import { GuiInputText } from './input-text/input-text';
import { GuiCondition, GuiControl, GuiFieldType, GuiFields, GuiTabsMode } from './interface';
import { GuiSelect } from './select/select';
import { GuiSlider } from './slider/slider';
import { GuiSwitch } from './switch/switch';
import { GuiTextarea } from './textarea/textarea';

import { GuiIconsRegistry } from './gui-icons';

let nextUniqueId = 0;

@Component({
  selector: 'gui-form',
  templateUrl: './gui-form.html',
  styleUrl: './gui-form.scss',
  host: {
    '[attr.id]': 'uid',
    'class': 'gui-form',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    MatIconButton,
    MatIcon,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    MatTabContent,
    GuiFieldGroup,
    GuiFlexDirective,
    GuiInputText,
    GuiInputNumber,
    GuiSelect,
    GuiSwitch,
    GuiSlider,
    GuiButtonToggle,
    GuiFill,
    GuiFileUploader,
    GuiImageSelect,
    GuiTextarea,
    GuiInlineGroup,
    GuiFieldLabel,
    GuiIconButtonWrapper,
    GuiEjsPipe,
    GuiCombobox,
    GuiCodearea,
  ],
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

  controlSubscriptions: Subscription[] = [];

  // Unique id for this form
  uid = `gui-form-${nextUniqueId++}`;

  constructor(iconsRegistry: GuiIconsRegistry) {
    iconsRegistry.add('horizontal', 'vertical', 'copy', 'add', 'delete');
  }

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
    this.controlSubscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Convert the object config to array config and register into the reactive form.
   *
   * @param form         The reactive form instance
   * @param config       The config of the form fields
   * @param model        The value of the form control
   * @param defaultValue The default value of the form field
   * @param parentType   The type of the form field parent
   * @returns
   */
  getFormFieldArray(
    form: FormGroup | FormArray,
    config: GuiFields | GuiControl[] = {},
    model: Record<string, any> = {},
    defaultValue: any = null,
    parentType: GuiFieldType = 'group'
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
        ...(config as any)[key],
        _type,
        key,
        parentType,
        model: model[key],
        default: defaultValue?.[key] ?? (config as any)[key].default,
        index: Number(key), // the string key will be `NaN`
        show: true,
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
        // If the model is an array, the default value of the form field
        // will use the model's value
        if (Array.isArray(item.model)) {
          item.default = item.model;
        }
        if (item.default?.length) {
          item.children = item.default.map((value: any) => {
            return {
              default: value,
              ...item.template,
            };
          });
        } else {
          item.children = [];
        }
      }

      // Parse the `showIf` conditions
      if (item.showIf) {
        const setVisibility = (compareWith: (condition: GuiCondition) => boolean) => {
          if (item.showIf!.logicalType === '$or') {
            item.show = item.showIf!.conditions.some(c => compareWith(c));
          } else {
            item.show = item.showIf!.conditions.every(c => compareWith(c));
          }
        };

        // Set the init visibility of the field
        setVisibility(c => {
          const cfg = getValueByPath(config, c[0]) ?? getValueByPath(this.config, c[0]);
          const val = getValueByPath(model, c[0]) ?? getValueByPath(this.model, c[0]);
          return compareValues(val ?? cfg?.['default'], c[2], c[1]);
        });

        // Delay the subscription to make sure all the form controls have been created
        setTimeout(() => {
          const getControl = (path: string) => form.get(path) || this.form.get(path);

          const controls = item.showIf!.conditions.map(c => getControl(c[0]));
          const valueChanges$ = controls.map(control => control?.valueChanges || of());
          const subscription = of()
            .pipe(mergeWith(...valueChanges$))
            .subscribe(() => {
              setVisibility(c => compareValues(getControl(c[0])?.value, c[2], c[1]));
            });

          this.controlSubscriptions.push(subscription);
        });
      }

      if (item._type === 'control') {
        const formState = { value: item.default, disabled: item.disabled };
        if (form instanceof FormGroup) {
          form.registerControl(item.key, new FormControl(formState));
        } else if (form instanceof FormArray) {
          form.insert(item.index || form.length, new FormControl(formState), { emitEvent: false });
        }
      } else if (item._type === 'array') {
        let formArray = new FormArray<any>([]);
        if (form instanceof FormGroup) {
          formArray = form.registerControl(item.key, new FormArray([])) as FormArray;
        } else if (form instanceof FormArray) {
          form.insert(item.index || form.length, formArray, { emitEvent: false });
        }

        item.children = this.getFormFieldArray(
          formArray,
          item.children,
          item.model,
          item.default,
          item.type
        );

        item.selectedIndex = 0;
      } else if (item._type === 'group') {
        let formGroup = new FormGroup({});
        if (form instanceof FormGroup) {
          formGroup = form.registerControl(item.key, new FormGroup({})) as FormGroup;
        } else if (form instanceof FormArray) {
          form.insert(item.index || form.length, formGroup, { emitEvent: false });
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
   * @param e         The mouse event
   * @param formArray The reactive form instance
   * @param tabs      The config of the tabs field
   * @param copy      Whether to copy the current tab
   * @param index     The index of the tabs array
   */
  addTab(e: MouseEvent, formArray: FormArray, tabs: GuiControl, copy?: boolean, index?: number) {
    e.stopPropagation();
    const insertIndex =
      index !== void 0 ? index + 1 : copy ? tabs.selectedIndex! + 1 : tabs.children!.length;
    // Save the index of the insertion in the config
    tabs.template!.index = insertIndex;
    // The key in the object and the index in the array should be the same
    tabs.children!.forEach((child, index) => {
      if (index >= insertIndex) {
        child.index! += 1;
        child.key = child.index + ''; // convert to string
      }
    });

    const formValue = formArray.get(insertIndex - 1 + '')?.value;
    // The constructed object looks like this `[{ key: 'tab', children: template }]`
    // The key should preferably be `null`
    const newTab = this.getFormFieldArray(
      formArray,
      { [insertIndex]: tabs.template } as GuiFields,
      copy ? { [insertIndex]: formValue } : {},
      copy ? { [insertIndex]: formValue } : null,
      'tabs'
    );
    tabs.children!.splice(insertIndex, 0, newTab[0]);

    // update the form model
    formArray.patchValue(formArray.value);
  }

  /**
   * Remove a tab item.
   *
   * @param e         The mouse event
   * @param formArray The reactive form instance
   * @param tabs      The config of the tabs field
   * @param index     The index of the tabs array
   */
  removeTab(e: MouseEvent, formArray: FormArray, tabs: GuiControl, index?: number) {
    e.stopPropagation();
    const removeIndex = index === void 0 ? tabs.selectedIndex! : index;
    tabs.children!.forEach((child, index) => {
      if (index > removeIndex) {
        child.index! -= 1;
        child.key = child.index + ''; // convert to string
      }
    });
    tabs.children!.splice(removeIndex, 1);
    formArray.removeAt(removeIndex);
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
