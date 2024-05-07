import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [CommonModule, HighlightModule, PageHeaderComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {}
