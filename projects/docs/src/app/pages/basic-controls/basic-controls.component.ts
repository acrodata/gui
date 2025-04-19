import { GuiFields } from '@acrodata/gui';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExampleViewerComponent, PageHeaderComponent } from '../../shared';

@Component({
  selector: 'app-basic-controls',
  standalone: true,
  imports: [ExampleViewerComponent, PageHeaderComponent, FormsModule],
  templateUrl: './basic-controls.component.html',
  styleUrl: './basic-controls.component.scss',
})
export class BasicControlsComponent {
  textConfig: GuiFields = {
    content: {
      type: 'text',
      name: 'Content',
      default: 'Hello world',
      description: 'I am description',
      prefix: '👋',
      suffix: '💖',
    },
  };

  numberConfig: GuiFields = {
    opacity: {
      type: 'number',
      name: 'Opacity',
      default: 0.33,
      min: 0,
      max: 1,
      step: 0.01,
    },
  };

  switchConfig: GuiFields = {
    visible: {
      type: 'switch',
      name: 'Visible',
      default: false,
    },
  };

  sliderConfig: GuiFields = {
    temperature: {
      type: 'slider',
      name: 'Temperature',
      mode: 'normal',
      default: 30,
      min: 0,
      max: 100,
      step: 5,
      suffix: '°C',
    },
  };
  isRangeSlider = false;
  toggleRangeSlider() {
    const { temperature } = this.sliderConfig;
    temperature.mode = this.isRangeSlider ? 'range' : 'normal';
    temperature.default = this.isRangeSlider ? [20, 60] : 30;
    this.sliderConfig = { ...this.sliderConfig };
  }

  fillConfig: GuiFields = {
    color: {
      type: 'fill',
      name: 'Color',
      default: '#ff0055',
    },
  };

  selectConfig: GuiFields = {
    font: {
      type: 'select',
      name: 'Font',
      default: 'arial',
      multiple: false,
      useFont: true,
      options: [
        { value: 'arial', label: 'Arial' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'monospace', label: 'Monospace' },
      ],
    },
  };
  isMultiSelect = false;
  toggleMultiSelect() {
    const { font } = this.selectConfig;
    font.multiple = this.isMultiSelect;
    font.default = this.isMultiSelect ? [] : 'arial';
    this.selectConfig = { ...this.selectConfig };
  }

  comboboxConfig: GuiFields = {
    font: {
      type: 'combobox',
      name: 'Font',
      default: 'arial',
      multiple: false,
      useFont: true,
      options: [
        { value: 'arial', label: 'Arial' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'monospace', label: 'Monospace' },
      ],
    },
  };
  isMultiCombobox = false;
  toggleMultiCombobox() {
    const { font } = this.comboboxConfig;
    font.multiple = this.isMultiCombobox;
    font.default = this.isMultiCombobox ? [] : 'arial';
    this.comboboxConfig = { ...this.comboboxConfig };
  }

  buttonToggleConfig: GuiFields = {
    textAlign: {
      type: 'buttonToggle',
      name: 'Align',
      default: 'right',
      multiple: false,
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
    },
  };
  isMultiButtonToggle = false;
  toggleMultiButtonToggle() {
    const { textAlign } = this.buttonToggleConfig;
    textAlign.multiple = this.isMultiButtonToggle;
    textAlign.default = this.isMultiButtonToggle ? [] : 'right';
    this.buttonToggleConfig = { ...this.buttonToggleConfig };
  }
  useIcon = 0;
  toggleIconButtonToggle() {
    const { textAlign } = this.buttonToggleConfig;
    textAlign.useIcon = this.useIcon > 0 ? true : false;
    textAlign.options = textAlign.options?.map(opt => {
      return {
        ...opt,
        src:
          this.useIcon == 1
            ? 'mdi mdi-format-align-' + opt.value
            : this.useIcon == 2
              ? './images/align_' + opt.value + '.png'
              : undefined,
      };
    });
    this.buttonToggleConfig = { ...this.buttonToggleConfig };
  }

  buttonToggleConfig2: GuiFields = {
    direction: {
      type: 'buttonToggle',
      name: 'Direction',
      default: 'c',
      options: [
        { value: 'nw', label: 'NW', col: 33.33 },
        { value: 'n', label: 'N', col: 33.33 },
        { value: 'ne', label: 'NE', col: 33.33 },
        { value: 'w', label: 'W', col: 33.33 },
        { value: 'c', label: 'C', col: 33.33 },
        { value: 'e', label: 'E', col: 33.33 },
        { value: 'sw', label: 'SW', col: 33.33 },
        { value: 's', label: 'S', col: 33.33 },
        { value: 'se', label: 'SE', col: 33.33 },
      ],
    },
  };

  imageSelectConfig: GuiFields = {
    background: {
      type: 'imageSelect',
      name: 'Background',
      default: 'img1',
      options: [
        {
          label: 'img1',
          value: 'img1',
          src: './images/icon3d1.webp',
        },
        {
          label: 'img2',
          value: 'img2',
          src: './images/icon3d2.webp',
        },
        {
          label: 'img3',
          value: 'img3',
          src: './images/icon3d3.webp',
        },
      ],
    },
  };

  textareaConfig: GuiFields = {
    foo: {
      type: 'textarea',
      name: 'Foo',
      default: 'I am a textarea',
      rows: 3,
    },
  };

  hiddenConfig: GuiFields = {
    id: {
      type: 'hidden',
      name: 'ID',
      default: 1,
    },
  };
}
