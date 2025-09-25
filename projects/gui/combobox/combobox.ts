import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatHint, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MtxSelect, MtxSelectOptionTemplate } from '@ng-matero/extensions/select';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiBasicValue, GuiControl } from '../interface';

@Component({
  selector: 'gui-combobox',
  templateUrl: './combobox.html',
  styleUrl: './combobox.scss',
  host: {
    class: 'gui-field gui-combobox',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiCombobox),
      multi: true,
    },
  ],
  imports: [
    FormsModule,
    MatFormField,
    MatPrefix,
    MatSuffix,
    MatHint,
    MtxSelect,
    MtxSelectOptionTemplate,
    GuiFieldLabel,
  ],
})
export class GuiCombobox implements ControlValueAccessor, AfterViewInit {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(MtxSelect) mtxSelect!: MtxSelect;

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;
  @Input() appendTo = 'body';

  value: GuiBasicValue | GuiBasicValue[] = '';

  private onChange: (value: GuiBasicValue | GuiBasicValue[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    // Add additional class for ng-select's dropdown panel
    const { ngSelect } = this.mtxSelect;
    (ngSelect as any).classes = (ngSelect.classes || '') + ' gui-combobox';
  }

  writeValue(value: any) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: GuiBasicValue | GuiBasicValue[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onValueChange() {
    this.onChange(this.value);
  }

  addTagFn(label: string) {
    return { label, value: label };
  }
}
