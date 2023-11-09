import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleViewerComponent, PageHeaderComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ExampleViewerComponent, PageHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  config = {
    title: {
      type: 'text',
      name: 'Title',
      default: 'ttt',
    },
  };
}
