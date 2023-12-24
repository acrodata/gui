import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GuiFields, GuiModule } from '@acrodata/gui';
import { MatButtonModule } from '@angular/material/button';
import { IBackground, gradientPresets } from './gradient-presets';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-gradient-generator',
  standalone: true,
  imports: [CommonModule, GuiModule, MatButtonModule],
  templateUrl: './gradient-generator.component.html',
  styleUrls: ['./gradient-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientGeneratorComponent implements OnInit {
  demoStyle = {};

  config: GuiFields = {
    gradients: {
      type: 'tabs',
      name: 'Bg gradients',
      template: {
        name: 'Gradient <%= i + 1 %>',
        children: {
          type: {
            type: 'buttonToggle',
            name: 'Type',
            options: [
              { label: 'linear', value: 'linear' },
              { label: 'radial', value: 'radial' },
              { label: 'conic', value: 'conic' },
            ],
          },
          repeating: {
            type: 'switch',
            name: 'Repeating',
          },
          reverse: {
            type: 'switch',
            name: 'Reverse',
          },
          angle: {
            type: 'slider',
            name: 'Angle',
            min: 0,
            max: 360,
            suffix: 'deg',
            description: 'Only support for linear-gradient',
          },
          radialBase: {
            type: 'text',
            name: 'Radial',
            placeholder: '<shape> <size> at <position>',
            description: 'Only support for radial-gradient',
          },
          conicBase: {
            type: 'text',
            name: 'Conic',
            placeholder: 'from <angle> at <position>',
            description: 'Only support for conic-gradient',
          },
          stops: {
            type: 'tabs',
            name: 'Color stops',
            template: {
              name: 'Stop <%= i + 1 %>',
              children: {
                color: {
                  type: 'fill',
                  name: 'Color',
                  default: '#000',
                },
                offset: {
                  type: 'text',
                  name: 'Offset',
                  default: '0%',
                },
              },
            },
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

  model = cloneDeep(gradientPresets[0]);

  presets = gradientPresets;

  presetStyles: any[] = [];

  ngOnInit(): void {
    this.demoStyle = this.getBgStyle(this.model);
    this.presetStyles = this.presets.map(m => this.getBgStyle(m));
  }

  getBgStyle(model: IBackground) {
    // Print the model object
    console.log(model);

    return {
      'background-image': model.gradients
        .map(b => {
          const type = b.repeating ? `repeating-${b.type}-gradient` : `${b.type}-gradient`;
          const angle = b.angle ? `${b.angle}deg,` : '';
          const base: any = {
            linear: angle,
            radial: b.radialBase ? `${b.radialBase},` : '',
            conic: b.conicBase ? `${b.conicBase},` : '',
          };
          const stops = b.stops
            ?.map((s, i) => ({
              ...s,
              color: b.reverse ? b.stops![b.stops!.length - 1 - i].color : s.color,
            }))
            .map(s => `${s.color} ${s.offset}`)
            .join(',');
          return stops ? `${type}(${base[b.type]}${stops})` : '';
        })
        .filter(b => b.trim())
        .join(','),
      'background-position': model.gradients
        .map(b => `${b.position?.x || ''} ${b.position?.y || ''}`)
        .filter(b => b.trim())
        .join(','),
      'background-size': model.gradients
        .map(b => `${b.size?.w || ''} ${b.size?.h || ''}`)
        .filter(b => b.trim())
        .join(','),
      'background-blend-mode': model.blendMode.join(','),
      'background-repeat': model.repeat,
    };
  }

  selectPreset(model: IBackground) {
    this.model = cloneDeep(model);
    this.config = cloneDeep(this.config);
  }
}
