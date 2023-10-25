import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-inline-group',
  templateUrl: './inline-group.html',
  styleUrls: ['./inline-group.scss'],
  host: {
    class: 'gui-inline-group',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiInlineGroup {
  @Input() config: Partial<GuiControl> = {};
}
