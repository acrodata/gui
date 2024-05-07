import { Component } from '@angular/core';
import { GradientGeneratorComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GradientGeneratorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
