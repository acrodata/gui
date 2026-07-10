import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-codearea-toolbar',
  template: `
    <ng-content />
  `,
  styleUrl: './codearea-toolbar.scss',
  host: {
    class: 'gui-codearea-toolbar',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiCodeareaToolbar {}
