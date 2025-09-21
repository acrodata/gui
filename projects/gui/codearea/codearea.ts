import { CodeEditor, Setup } from '@acrodata/code-editor';
import { RndDialog } from '@acrodata/rnd-dialog';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiIconsRegistry } from '../gui-icons';
import { GuiIconButtonWrapper } from '../icon-button-wrapper/icon-button-wrapper';
import { GuiControl } from '../interface';
import { GuiCodeareaConfig } from './codearea-config';
import { GuiCodeareaDialog, GuiCodeareaDialogData } from './codearea-dialog';

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
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    MatHint,
    CodeEditor,
    GuiFieldLabel,
    GuiIconButtonWrapper,
  ],
})
export class GuiCodearea implements ControlValueAccessor {
  private rndDialog = inject(RndDialog);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private codeareaCfg = inject(GuiCodeareaConfig);

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;

  @Input() setup: Setup = 'minimal';

  @Input()
  get height() {
    return coerceCssPixelValue(this.config.height || this._height);
  }
  set height(value: string | number) {
    this._height = value;
  }
  private _height: string | number = 120;

  @Input()
  get language() {
    return this.config.language || this._language;
  }
  set language(value: string) {
    this._language = value;
  }
  private _language = '';

  get languages() {
    return this.codeareaCfg.languages;
  }

  get theme() {
    return this.codeareaCfg.theme;
  }

  get dialogData(): GuiCodeareaDialogData {
    return {
      value: this.value,
      disabled: this.disabled,
      language: this.language,
    };
  }

  get extensions() {
    return typeof this.codeareaCfg.extensions === 'function'
      ? this.codeareaCfg.extensions(this.dialogData)
      : this.codeareaCfg.extensions;
  }

  value = '';
  private oldValue = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    const iconsRegistry = inject(GuiIconsRegistry);
    iconsRegistry.add('expand');

    this.codeareaCfg.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

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

  onExpand() {
    const dialogRef = this.rndDialog.open<string, GuiCodeareaDialogData, GuiCodeareaDialog>(
      GuiCodeareaDialog,
      {
        panelClass: 'gui-codearea-dialog-panel',
        hasBackdrop: false,
        width: '600px',
        data: this.dialogData,
      }
    );

    dialogRef.closed.subscribe(newValue => {
      if (newValue) {
        this.value = newValue;
        this.cdr.detectChanges();
        this.onValueChange();
      }
    });
  }
}
