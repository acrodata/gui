import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-field-inline',
  templateUrl: './field-inline.html',
  styleUrls: ['./field-inline.scss'],
  host: {
    class: 'gui-inline',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiFieldInline {}
