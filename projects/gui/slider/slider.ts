import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.scss'],
  host: {
    class: 'gui-field gui-slider',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiSlider),
      multi: true,
    },
  ],
})
export class GuiSlider implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value!: number | number[];

  // 区间滑块的输入框绑定值
  minValue!: number;
  maxValue!: number;

  private onChange: (value: number | number[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: number) {
    this.value = value;
    this.setInputValue();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: number | number[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onValueChange() {
    this.onChange(this.value);
  }

  onRangeSliderChange() {
    this.setInputValue();
    this.onValueChange();
  }

  onRangeInputChange() {
    this.value = [this.minValue, this.maxValue];
    this.onValueChange();
  }

  setInputValue() {
    if (Array.isArray(this.value)) {
      this.minValue = this.value[0];
      this.maxValue = this.value[1];
    }
  }
}
