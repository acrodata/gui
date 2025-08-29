import { GradientPicker } from '@acrodata/gradient-picker';
import { GuiFileUploader, GuiIconsRegistry } from '@acrodata/gui';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TinyColor } from '@ctrl/tinycolor';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';

@Component({
  selector: 'gui-fill-picker',
  templateUrl: './fill-picker.html',
  styleUrl: './fill-picker.scss',
  host: {
    class: 'gui-fill-picker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiFillPicker),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    ColorChromeModule,
    GradientPicker,
    GuiFileUploader,
  ],
})
export class GuiFillPicker implements ControlValueAccessor {
  @Input() disabled = false;

  value = '';

  types = [
    { label: 'Solid', value: 'solid', icon: '' },
    { label: 'Gradient', value: 'gradient' },
    { label: 'Image', value: 'image' },
  ];

  selectedType = 'solid';

  colorFormat: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    iconsRegistry: GuiIconsRegistry
  ) {
    iconsRegistry.add('solid', 'gradient', 'image');
  }

  writeValue(value: string) {
    if (typeof value === 'string') {
      value = value.trim();
      if (value.includes('linear') || value.includes('radial') || value.includes('conic')) {
        this.selectedType = 'gradient';
        this.value = value;
      } else if (value.startsWith('url')) {
        this.selectedType = 'image';
        const regex = /url\((?:'|")?([^'"]+?)(?:'|")?\)/;
        this.value = value.match(regex)?.[1] || '';
      } else {
        this.selectedType = 'solid';
        this.value = value;
        this.colorFormat = this.getColorFormat();
      }
      this.cdr.markForCheck();
    }
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

  getColorFormat() {
    const color = new TinyColor(this.value);
    if (color.format === 'rgb' || color.format === 'hsl' || color.format === 'hsv') {
      return color.format;
    } else {
      return 'hex';
    }
  }

  onTypeChange() {
    if (this.selectedType === 'solid') {
      this.value = '#000';
    } else if (this.selectedType === 'gradient') {
      this.value = 'linear-gradient(transparent, #000)';
    } else if (this.selectedType === 'image') {
      this.value = '';
    }
    this.onChange(this.value);
    this.cdr.markForCheck();
  }

  onColorChange(e: ColorEvent) {
    this.value = {
      hex: e.color.rgb.a === 1 ? e.color.hex : new TinyColor(e.color.rgb).toHex8String(),
      rgb: new TinyColor(e.color.rgb).toRgbString(),
      hsl: new TinyColor(e.color.hsl).toHslString(),
      hsv: new TinyColor(e.color.hsv).toHsvString(),
    }[this.colorFormat];
    this.onChange(this.value);
  }

  onGradientChange() {
    this.onChange(this.value);
  }

  onImageChange() {
    this.onChange(`url("${this.value}")`);
  }
}
