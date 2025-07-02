import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-inline-group',
  templateUrl: './inline-group.html',
  styleUrl: './inline-group.scss',
  host: {
    class: 'gui-inline-group',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GuiFieldLabel],
})
export class GuiInlineGroup {
  @Input() config: Partial<GuiControl> = {};
}
