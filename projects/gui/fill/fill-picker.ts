import { GradientPicker } from '@acrodata/gradient-picker';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TinyColor } from '@ctrl/tinycolor';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';
import { GuiFileUploader } from '../file-uploader/file-uploader';
import { GuiIconsRegistry } from '../gui-icons';
import { GuiFillMode } from '../interface';

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
    MatTooltipModule,
    ColorChromeModule,
    GradientPicker,
    GuiFileUploader,
  ],
})
export class GuiFillPicker implements ControlValueAccessor, OnChanges {
  @Input() disabled = false;
  @Input() type?: GuiFillMode | null;

  types = [
    { label: 'Solid', value: 'solid' },
    { label: 'Gradient', value: 'gradient' },
    { label: 'Image', value: 'image' },
  ];

  selectedType = 'solid';

  colorFormat: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    iconsRegistry: GuiIconsRegistry
  ) {
    iconsRegistry.add('solid', 'gradient', 'image');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      if (this.type === 'gradient') {
        this.selectedType = 'gradient';
      } else if (this.type === 'image') {
        this.selectedType = 'image';
      } else {
        this.selectedType = 'solid';
      }
      this.setValueByType();
    }
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      value = value.trim();
      if (!this.type) {
        this.getTypeFromModel(value);
      }
      this.getValueFromModel(value);
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

  getTypeFromModel(value: string) {
    if (value.includes('linear') || value.includes('radial') || value.includes('conic')) {
      this.selectedType = 'gradient';
    } else if (value.startsWith('url')) {
      this.selectedType = 'image';
    } else {
      this.selectedType = 'solid';
    }
  }

  getValueFromModel(value: string) {
    if (this.selectedType === 'solid') {
      this.value = value;
      this.colorFormat = this.getColorFormat();
    } else if (this.selectedType === 'gradient') {
      this.value = value;
    } else if (this.selectedType === 'image') {
      const regex = /url\((?:'|")?([^'"]+?)(?:'|")?\)/;
      this.value = value.match(regex)?.[1] || '';
    }
  }

  setValueByType() {
    if (this.selectedType === 'solid') {
      this.value = '#000';
    } else if (this.selectedType === 'gradient') {
      this.value = 'linear-gradient(transparent, #000)';
    } else if (this.selectedType === 'image') {
      this.value = '';
    }
  }

  onTypeChange() {
    this.setValueByType();
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
