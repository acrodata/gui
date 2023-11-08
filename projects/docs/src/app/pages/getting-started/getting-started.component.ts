import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent {}
