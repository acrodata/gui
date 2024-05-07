import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { GuiFieldLabel } from '../field-label/field-label';
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
  standalone: true,
  imports: [NgIf, GuiFieldLabel],
})
export class GuiInlineGroup {
  @Input() config: Partial<GuiControl> = {};
}
