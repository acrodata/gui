import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatHint, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlider, MatSliderRangeThumb, MatSliderThumb } from '@angular/material/slider';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
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
  standalone: true,
  imports: [
    FormsModule,
    MatSlider,
    MatSliderThumb,
    MatFormField,
    MatPrefix,
    MatInput,
    MatSuffix,
    MatSliderRangeThumb,
    MatHint,
    GuiFieldLabel,
  ],
})
export class GuiSlider implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value!: number | number[];

  // The input binding value for range slider
  minValue!: number;
  maxValue!: number;

  private onChange: (value: number | number[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: any) {
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
    this.cdr.markForCheck();
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
