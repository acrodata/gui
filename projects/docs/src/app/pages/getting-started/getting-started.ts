import { Component } from '@angular/core';
import { PageHeader } from '../../shared';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-getting-started',
  imports: [HighlightModule, PageHeader],
  templateUrl: './getting-started.html',
  styleUrl: './getting-started.scss',
})
export class GettingStarted {}
