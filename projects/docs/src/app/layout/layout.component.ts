import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidemenuComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  host: {
    class: 'container-wrap',
  },
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {}
