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
import { MatFormField, MatHint, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-input-number',
  templateUrl: './input-number.html',
  styleUrl: './input-number.scss',
  host: {
    class: 'gui-field gui-input-number',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiInputNumber),
      multi: true,
    },
  ],
  standalone: true,
  imports: [FormsModule, MatFormField, MatPrefix, MatInput, MatSuffix, MatHint, GuiFieldLabel],
})
export class GuiInputNumber implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value!: number;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: number) => void) {
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
