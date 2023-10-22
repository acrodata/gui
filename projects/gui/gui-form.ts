import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ejsTmpl } from './gui-utils';
import { GuiFieldType, GuiFields, GuiControl, GuiTabsMode } from './interface';

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
  @Input() form = new FormGroup<any>({});

  @Input() config: GuiFields = {};

  @Input() model: any = {};

  formFields: GuiControl[] = [];

  formSubscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.form.controls = {}; // 重置表单控件
      this.formFields = this.getFormFieldArray(this.form, this.config, this.model);
    }

    if (changes['model'] && this.model && Object.keys(this.model).length > 0) {
      this.form.patchValue(this.model);
    }
  }

  ngOnInit(): void {
    this.formSubscription = this.form.valueChanges.subscribe(value => {
      Object.assign(this.model, value);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * 将动态表单的对象配置转换为数组配置，并注册到响应式表单中
   *
   * @param form         响应式表单实例
   * @param config       动态表单配置
   * @param model        动态表单模型
   * @param defaultValue 配置项中的默认值
   * @param parentType   父组件类型
   * @param options      响应式表单配置
   * @returns            表单配置数组
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
      // 根据 children 类型推测表单类型
      // 1. undefined: FormControl
      // 2. array: FormArray
      // 3. object: FormGroup
      const _children = (config as any)[key].template ? [] : (config as any)[key].children;
      const _type = !_children ? 'control' : Array.isArray(_children) ? 'array' : 'group';

      const item: GuiControl = {
        _type,
        key,
        parentType,
        model: model[key],
        default: defaultValue?.[key],
        index: Number(key), // 字符串 key 为 NaN
        ...(config as any)[key],
      };

      // group 类型控件一般没有 default，必须手动设置默认值
      if (item.children && model[key] == null && item.default == null) {
        item.model = model[key] = item._type === 'array' ? [] : {};
      }

      // 根据 config 中的 default 生成 model
      if (typeof model === 'object' && model[key] == null) {
        model[key] = item.default;
      }

      // tabs 类型特殊判断，有 template 的情况下 children 定义无效
      if (item.template) {
        // 如果 model 是数组且存在值则表单项的默认值优先使用 model 的值
        if (Array.isArray(item.model) && item.model.length > 0) {
          item.default = item.model;
        }
        if (item.default?.length) {
          item.children = item.default.map((value: any) => {
            // 合并 template 中的默认值
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
   * 添加数组项
   *
   * @param e     鼠标事件
   * @param form  表单实例
   * @param tabs  动态数组的配置项
   * @param index 数组索引
   */
  addTab(e: MouseEvent, form: FormArray, tabs: GuiControl, index?: number) {
    e.stopPropagation();
    const insertIndex = index === void 0 ? tabs.children!.length : index + 1;
    // 将插入位置的 index 保存在配置中
    tabs.template!.index = insertIndex;
    // 对象中的 key 和数组中的 index 要保持一致
    tabs.children!.forEach((child, index) => {
      if (index >= insertIndex) {
        child.index! += 1;
        child.key = child.index!.toString();
      }
    });
    // 构造出来的对象 [{ key: 'tab', children: template }]，key 最好为 null
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
   * 删除数组项
   *
   * @param e     鼠标事件
   * @param form  表单实例
   * @param tabs  动态数组的配置项
   * @param index 数组索引
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
   * 切换 tabs 显示模式
   *
   * @param e    鼠标事件
   * @param item 配置项
   * @param mode tabs 显示模式
   */
  changeTabsMode(e: MouseEvent, item: GuiControl, mode?: GuiTabsMode) {
    e.stopPropagation();
    item.mode = mode;
  }

  /**
   * EJS 模板转换函数，只有标题需要处理
   *
   * @description 转换之后的配置对象变更会触发视图更新
   * @param item 配置项
   * @returns
   */
  ejs(item: GuiControl) {
    const { name, index, description, type, parentType } = item;
    return {
      name: index != null && !isNaN(index) ? ejsTmpl(name, { i: index }) : name,
      description,
      type,
      parentType,
    };
  }
}
