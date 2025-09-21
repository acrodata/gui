import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatHint } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-switch',
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
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
  standalone: true,
  imports: [FormsModule, MatSlideToggle, MatHint, GuiFieldLabel],
})
export class GuiSwitch implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any) {
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
    this.cdr.markForCheck();
  }

  onValueChange() {
    this.onChange(this.value);
  }
}
