import { Component } from '@angular/core';
import { GradientGenerator } from '../../shared';

@Component({
  selector: 'app-home',
  imports: [GradientGenerator],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
