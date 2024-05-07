import { GuiFields } from '@acrodata/gui';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'page-header',
  },
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() config: GuiFields | null = null;
}
