import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatHint, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MtxColorpicker, MtxColorpickerInput } from '@ng-matero/extensions/colorpicker';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiIconsRegistry } from '../gui-icons';
import { GuiIconButtonWrapper } from '../icon-button-wrapper/icon-button-wrapper';
import { GuiControl, GuiFillMode } from '../interface';
import { GuiFillPicker } from './fill-picker';

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
  imports: [
    FormsModule,
    MatFormField,
    MatPrefix,
    MatInput,
    MatHint,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MtxColorpickerInput,
    MtxColorpicker,
    GuiFieldLabel,
    GuiFillPicker,
    GuiIconButtonWrapper,
  ],
})
export class GuiFill implements ControlValueAccessor, OnChanges {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(MtxColorpicker) colorpicker?: MtxColorpicker;

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;
  @Input() type: GuiFillMode = 'all';

  value: string | null = '';

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    const iconsRegistry = inject(GuiIconsRegistry);
    iconsRegistry.add('clear');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.type = (this.config.mode || 'all') as GuiFillMode;
    }
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (value: string | null) => void) {
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

  openColorPicker(e: PointerEvent) {
    e.stopPropagation();
    this.colorpicker?.open();
  }

  clearValue() {
    this.value = null;
    this.onValueChange();
  }
}
