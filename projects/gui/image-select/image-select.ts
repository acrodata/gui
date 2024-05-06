import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MtxSelect } from '@ng-matero/extensions/select';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-image-select',
  templateUrl: './image-select.html',
  styleUrls: ['./image-select.scss'],
  host: {
    class: 'gui-field gui-image-select',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiImageSelect),
      multi: true,
    },
  ],
})
export class GuiImageSelect implements ControlValueAccessor, AfterViewInit {
  @ViewChild(MtxSelect) mtxSelect!: MtxSelect;

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;
  @Input() appendTo = 'body';

  value: unknown;

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Add additional class for ng-select's dropdown panel
    const { ngSelect } = this.mtxSelect;
    ngSelect.classes = (ngSelect.classes || '') + ' gui-image-select';
  }

  writeValue(value: unknown) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void) {
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
