import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ejsTmpl } from '../gui-utils';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-field-label',
  templateUrl: './field-label.html',
  styleUrl: './field-label.scss',
  host: {
    '[class.gui-field-label]': '!styless',
    '[title]': 'title',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatTooltip],
})
export class GuiFieldLabel implements OnChanges {
  @Input() config: Partial<GuiControl> = {};

  @Input() index?: number;

  title = '';

  styless = false;

  ngOnChanges(): void {
    const { index, name, parentType, type } = this.config;
    this.title = index != null && !isNaN(index) ? ejsTmpl(name || '', { i: index }) : name;
    this.styless =
      (parentType === 'inline' && type !== 'inline') || type === 'group' || type === 'tabs';
  }
}
