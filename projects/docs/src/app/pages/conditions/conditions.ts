import { GuiFields } from '@acrodata/gui';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { ExampleViewer, PageHeader } from '../../shared';

@Component({
  selector: 'app-conditions',
  imports: [PageHeader, ExampleViewer, HighlightModule],
  templateUrl: './conditions.html',
  styleUrl: './conditions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Conditions {
  ruleJson = `{
  ...
  "showIf": {
    "conditions": [
      ["path", "operator", "value"],
      ...
    ],
    "logicalType": "$or"
  },
}`;

  demo1: GuiFields = {
    a: {
      type: 'group',
      name: 'groupA',
      children: {
        switchA: {
          type: 'switch',
          name: 'switchA',
          default: true,
        },
        textA: {
          type: 'text',
          name: 'textA',
          default: 'A',
          showIf: {
            conditions: [
              ['a.switchA', '$ne', false],
              ['b.switchB', '$eq', true],
            ],
            logicalType: '$or',
          },
        },
      },
      expanded: true,
    },
    b: {
      type: 'group',
      name: 'groupB',
      children: {
        switchB: {
          type: 'switch',
          name: 'switchB',
          default: false,
        },
        textB: {
          type: 'text',
          name: 'textB',
          default: 'B',
        },
      },
      expanded: true,
    },
  };

  demo2: GuiFields = {
    array: {
      name: 'Array',
      type: 'tabs',
      default: [
        { switch: true, text: 'A' },
        { switch: true, text: 'B' },
      ],
      template: {
        name: 'No.<%= i + 1%>',
        children: {
          switch: {
            type: 'switch',
            name: 'switch',
            default: true,
          },
          text: {
            type: 'text',
            name: 'text',
            showIf: {
              conditions: [['switch', '$eq', true]],
            },
          },
        },
      },
      expanded: true,
      mode: 'list',
    },
  };
}
