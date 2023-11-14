import { GuiFields } from '@acrodata/gui';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExampleViewerComponent, PageHeaderComponent } from '../../shared';

@Component({
  selector: 'app-basic-controls',
  standalone: true,
  imports: [
    CommonModule,
    ExampleViewerComponent,
    PageHeaderComponent,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './basic-controls.component.html',
  styleUrls: ['./basic-controls.component.scss'],
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
    opacity: {
      type: 'slider',
      name: 'Opacity',
      default: 0.33,
      min: 0,
      max: 1,
      step: 0.01,
    },
  };

  sliderRangeConfig: GuiFields = {
    temperature: {
      type: 'slider',
      name: 'Temperature',
      mode: 'range',
      default: [16, 64],
      suffix: '°C',
    },
  };

  fillConfig: GuiFields = {
    color: {
      type: 'fill',
      name: 'Color',
      default: '#ff0055',
    },
  };

  isMultiSelect = false;
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
  onSelectMultiChange() {
    this.selectConfig['font'].multiple = this.isMultiSelect;
    this.selectConfig['font'].default = this.isMultiSelect ? [] : 'arial';
    this.selectConfig = { ...this.selectConfig };
  }

  isMultiButtonToggle = false;
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
  onButtonToggleMultiChange() {
    this.buttonToggleConfig['textAlign'].multiple = this.isMultiButtonToggle;
    this.buttonToggleConfig['textAlign'].default = this.isMultiButtonToggle ? [] : 'right';
    this.buttonToggleConfig = { ...this.buttonToggleConfig };
  }

  imageSelectConfig: GuiFields = {
    background: {
      type: 'imageSelect',
      name: 'Background',
      default: 'img1',
      options: [
        {
          label: 'img1',
          value: 'img1',
          src: './assets/images/icon3d1.webp',
        },
        {
          label: 'img2',
          value: 'img2',
          src: './assets/images/icon3d2.webp',
        },
        {
          label: 'img3',
          value: 'img3',
          src: './assets/images/icon3d3.webp',
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
