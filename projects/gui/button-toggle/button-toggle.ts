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
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatHint } from '@angular/material/form-field';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiFlexDirective } from '../gui-utils';
import { GuiBasicValue, GuiControl } from '../interface';
import { GuiIcon } from './icon';

@Component({
  selector: 'gui-button-toggle',
  templateUrl: './button-toggle.html',
  styleUrl: './button-toggle.scss',
  host: {
    class: 'gui-field gui-button-toggle',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiButtonToggle),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatHint,
    GuiFlexDirective,
    GuiIcon,
    GuiFieldLabel,
  ],
})
export class GuiButtonToggle implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  value: GuiBasicValue | GuiBasicValue[] = '';

  private onChange: (value: GuiBasicValue | GuiBasicValue[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any) {
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
}
