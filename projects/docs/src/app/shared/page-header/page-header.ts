import { GuiFields } from '@acrodata/gui';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'page-header',
  },
})
export class PageHeader {
  @Input() pageTitle = '';
  @Input() pageContent = '';
  @Input() config: GuiFields | null = null;
}
