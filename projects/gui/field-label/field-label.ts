import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-field-label',
  templateUrl: './field-label.html',
  styleUrls: ['./field-label.scss'],
  host: {
    '[class.gui-label]': '!noLabelClass()',
    '[title]': 'config.name',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiFieldLabel {
  @Input() config: Partial<GuiControl> = {};

  noLabelClass() {
    return (
      this.config.parentType === 'inline' ||
      this.config.type === 'group' ||
      this.config.type === 'tabs'
    );
  }
}
