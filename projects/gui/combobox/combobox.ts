import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GuiBasicValue, GuiControl } from '../interface';

@Component({
  selector: 'gui-combobox',
  templateUrl: './combobox.html',
  styleUrls: ['./combobox.scss'],
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
})
export class GuiCombobox implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value: GuiBasicValue | GuiBasicValue[] = '';

  private onChange: (value: GuiBasicValue | GuiBasicValue[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: GuiBasicValue | GuiBasicValue[]) {
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
