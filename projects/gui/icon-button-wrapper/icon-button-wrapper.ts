import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-icon-button-wrapper',
  standalone: true,
  templateUrl: './icon-button-wrapper.html',
  styleUrl: './icon-button-wrapper.scss',
  host: {
    class: 'gui-icon-button-wrapper',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiIconButtonWrapper {}
