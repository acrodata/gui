import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuiFields } from '@acrodata/gui';
import { ExampleViewerComponent, PageHeaderComponent } from '../../shared';

@Component({
  selector: 'app-basic-controls',
  standalone: true,
  imports: [CommonModule, ExampleViewerComponent, PageHeaderComponent],
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
      options: [
        { value: 'arial', label: 'Arial' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'monospace', label: 'Monospace' },
      ],
      useFont: true,
    },
  };

  buttonToggleConfig: GuiFields = {
    textAlign: {
      type: 'buttonToggle',
      name: 'Align',
      default: 'right',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
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
          src: 'https://iconfont.alicdn.com/p/illus_3d/file/4YT18QCAgs2C/01d188be-0beb-4461-9273-b7c53fd65ca6.png',
        },
        {
          label: 'img2',
          value: 'img2',
          src: 'https://iconfont.alicdn.com/p/illus_3d/file/4YT18QCAgs2C/e565a17b-e0f8-4672-9eb9-de99df82b7a9.png',
        },
        {
          label: 'img3',
          value: 'img3',
          src: 'https://iconfont.alicdn.com/p/illus_3d/file/4YT18QCAgs2C/e4390f23-e442-4db1-b723-1e5d84c7a8fa.png',
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
