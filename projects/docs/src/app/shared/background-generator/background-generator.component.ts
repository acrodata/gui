import { GuiFields, GuiModule } from '@acrodata/gui';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { IBackground, presets } from './presets';

@Component({
  selector: 'app-background-generator',
  imports: [GuiModule],
  templateUrl: './background-generator.component.html',
  styleUrl: './background-generator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientGeneratorComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  demoStyle = {};

  config: GuiFields = {
    layers: {
      type: 'tabs',
      name: 'Bg layers',
      template: {
        name: 'Layer <%= i + 1 %>',
        children: {
          image: {
            type: 'fill',
            name: 'Image',
            mode: 'gradient',
          },
          position: {
            type: 'inline',
            name: 'Position',
            children: {
              x: {
                type: 'text',
                name: '',
                placeholder: 'X',
                col: 50,
              },
              y: {
                type: 'text',
                name: '',
                placeholder: 'Y',
                col: 50,
              },
            },
          },
          size: {
            type: 'inline',
            name: 'Size',
            children: {
              w: {
                type: 'text',
                name: '',
                placeholder: 'W',
                col: 50,
              },
              h: {
                type: 'text',
                name: '',
                placeholder: 'H',
                col: 50,
              },
            },
          },
        },
      },
    },
    blendMode: {
      type: 'tabs',
      name: 'Bg blend mode',
      mode: 'list',
      template: {
        type: 'select',
        name: 'Blend mode <%= i + 1 %>',
        options: [
          { label: 'normal', value: 'normal' },
          { label: 'multiply', value: 'multiply' },
          { label: 'screen', value: 'screen' },
          { label: 'overlay', value: 'overlay' },
          { label: 'darken', value: 'darken' },
          { label: 'lighten', value: 'lighten' },
          { label: 'color-dodge', value: 'color-dodge' },
          { label: 'color-burn', value: 'color-burn' },
          { label: 'hard-light', value: 'hard-light' },
          { label: 'soft-light', value: 'soft-light' },
          { label: 'difference', value: 'difference' },
          { label: 'exclusion', value: 'exclusion' },
          { label: 'hue', value: 'hue' },
          { label: 'saturation', value: 'saturation' },
          { label: 'color', value: 'color' },
          { label: 'luminosity', value: 'luminosity' },
        ],
      },
    },
    repeat: {
      type: 'select',
      name: 'Bg repeat',
      options: [
        { label: 'no-repeat', value: 'no-repeat' },
        { label: 'repeat', value: 'repeat' },
        { label: 'repeat-x', value: 'repeat-x' },
        { label: 'repeat-y', value: 'repeat-y' },
        { label: 'round', value: 'round' },
        { label: 'space', value: 'space' },
      ],
    },
  };

  model = cloneDeep(presets[0]);

  presets = presets;

  presetStyles: any[] = [];

  ngOnInit(): void {
    this.demoStyle = this.getBgStyle(this.model);
    this.presetStyles = this.presets.map(m => this.getBgStyle(m));
  }

  getBgStyle(bg: IBackground) {
    // Print the object
    console.log(bg);

    return {
      'background-image': bg.layers
        .map(l => l.image || '')
        .filter(i => i.trim())
        .join(','),
      'background-position': bg.layers
        .map(l => `${l.position?.x || ''} ${l.position?.y || ''}`)
        .filter(p => p.trim())
        .join(','),
      'background-size': bg.layers
        .map(l => `${l.size?.w || ''} ${l.size?.h || ''}`)
        .filter(s => s.trim())
        .join(','),
      'background-blend-mode': bg.blendMode.join(','),
      'background-repeat': bg.repeat,
    };
  }

  selectPreset(model: IBackground) {
    this.model = cloneDeep(model);
    this.config = cloneDeep(this.config);
  }

  onModelChange() {
    this.demoStyle = this.getBgStyle(this.model);
    this.cdr.detectChanges();
  }
}
