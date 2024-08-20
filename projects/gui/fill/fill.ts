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
import {
  MtxColorpicker,
  MtxColorpickerInput,
  MtxColorpickerToggle,
} from '@ng-matero/extensions/colorpicker';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiIconButtonWrapper } from '../icon-button-wrapper/icon-button-wrapper';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-fill',
  templateUrl: './fill.html',
  styleUrl: './fill.scss',
  host: {
    class: 'gui-field gui-fill',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiFill),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatPrefix,
    MatInput,
    MatSuffix,
    MatHint,
    MtxColorpickerInput,
    MtxColorpicker,
    MtxColorpickerToggle,
    GuiFieldLabel,
    GuiIconButtonWrapper,
  ],
})
export class GuiFill implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void) {
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
