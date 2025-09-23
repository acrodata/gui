import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-getting-started',
  imports: [HighlightModule, PageHeaderComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {}
