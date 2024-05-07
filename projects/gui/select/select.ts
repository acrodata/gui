import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatHint, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiBasicValue, GuiControl } from '../interface';

@Component({
  selector: 'gui-select',
  templateUrl: './select.html',
  styleUrl: './select.scss',
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
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatPrefix,
    MatSelect,
    MatOption,
    MatSuffix,
    MatHint,
    GuiFieldLabel,
  ],
})
export class GuiSelect implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value: GuiBasicValue = '';

  private onChange: (value: GuiBasicValue) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string | number) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: GuiBasicValue) => void) {
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
