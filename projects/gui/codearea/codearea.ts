import { CodeEditor } from '@acrodata/code-editor';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatHint } from '@angular/material/form-field';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-codearea',
  templateUrl: './codearea.html',
  styleUrl: './codearea.scss',
  host: {
    class: 'gui-field gui-codearea',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiCodearea),
      multi: true,
    },
  ],
  standalone: true,
  imports: [FormsModule, MatHint, CodeEditor, GuiFieldLabel],
})
export class GuiCodearea implements ControlValueAccessor {
  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  get height() {
    return coerceCssPixelValue(this.config.height || 160);
  }

  value = '';
  private oldValue = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: any) {
    if (typeof value === 'string' || value == null) {
      this.value = value || '';
    } else {
      this.value = value.toString();
    }
    this.oldValue = this.value;
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
    if (this.value !== this.oldValue) {
      this.onChange(this.value);
      this.oldValue = this.value;
    }
  }
}
