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

  textareaConfig: GuiFields = {
    foo: {
      type: 'textarea',
      name: 'Foo',
      default: 'I am a textarea',
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
