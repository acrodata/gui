import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GuiConfigOption, GuiControl } from '../interface';

@Component({
  selector: 'gui-image-select',
  templateUrl: './image-select.html',
  styleUrls: ['./image-select.scss'],
  host: {
    class: 'gui-field gui-image-select',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiImageSelect),
      multi: true,
    },
  ],
})
export class GuiImageSelect implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value: unknown;

  selectedOption?: GuiConfigOption;

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: unknown) {
    this.value = value;
    if (this.value) {
      this.selectedOption = this.config.options?.find(opt => opt.value === this.value);
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void) {
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

  onImageSelect(option: GuiConfigOption) {
    this.value = option.value;
    this.selectedOption = option;
    this.onChange(this.value);
  }
}
