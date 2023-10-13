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
  selector: 'gui-switch',
  templateUrl: './switch.html',
  styleUrls: ['./switch.scss'],
  host: {
    class: 'gui-field gui-switch',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiSwitch),
      multi: true,
    },
  ],
})
export class GuiSwitch implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: boolean) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void) {
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
