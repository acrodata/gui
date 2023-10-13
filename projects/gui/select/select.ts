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
  selector: 'gui-select',
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
  host: {
    class: 'gui-field gui-select',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiSelect),
      multi: true,
    },
  ],
})
export class GuiSelect implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value!: string | number | boolean;

  private onChange: (value: string | number | boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string | number) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | number | boolean) => void) {
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
}
