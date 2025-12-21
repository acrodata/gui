import { ColorPicker } from '@acrodata/color-picker';
import { GradientPicker } from '@acrodata/gradient-picker';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
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
  imports: [
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    ColorPicker,
    GradientPicker,
    GuiFileUploader,
  ],
})
export class GuiFillPicker implements ControlValueAccessor, OnChanges {
  private cdr = inject(ChangeDetectorRef);

  @Input() disabled = false;
  @Input() type: GuiFillMode = 'all';

  types = [
    { label: 'Solid', value: 'solid' },
    { label: 'Gradient', value: 'gradient' },
    { label: 'Image', value: 'image' },
  ];

  selectedType: Exclude<GuiFillMode, 'all'> = 'solid';

  fillValue = {
    solid: '#000',
    gradient: 'linear-gradient(transparent, #000)',
    image: '',
  };

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    const iconsRegistry = inject(GuiIconsRegistry);
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
    }
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      value = value.trim();
      if (this.type === 'all') {
        this.getTypeFromModel(value);
      }
      if (value) {
        this.getValueFromModel(value);
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
      this.fillValue.solid = value;
    } else if (this.selectedType === 'gradient') {
      this.fillValue.gradient = value;
    } else if (this.selectedType === 'image') {
      const regex = /url\((?:'|")?([^'"]+?)(?:'|")?\)/;
      this.fillValue.image = value.match(regex)?.[1] || '';
    }
  }

  onTypeChange() {
    if (this.selectedType === 'solid') {
      this.onSolidChange();
    } else if (this.selectedType === 'gradient') {
      this.onGradientChange();
    } else if (this.selectedType === 'image') {
      this.onImageChange();
    }
  }

  onColorChange() {
    this.onSolidChange();
  }

  onSolidChange() {
    this.onChange(this.fillValue.solid);
  }

  onGradientChange() {
    this.onChange(this.fillValue.gradient);
  }

  onImageChange() {
    const bgImg = `url("${this.fillValue.image}")`;
    this.onChange(bgImg);
  }
}
