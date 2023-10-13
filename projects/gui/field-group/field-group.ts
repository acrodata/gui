import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-field-group',
  templateUrl: './field-group.html',
  styleUrls: ['./field-group.scss'],
  host: {
    class: 'gui-field-group',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiFieldGroup {
  @Input() config: Partial<GuiControl> = {};
}
