import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {
  menu = [
    {
      name: 'Getting started',
      route: 'getting-started',
    },
    {
      name: 'Basic controls',
      route: 'basic-controls',
    },
    {
      name: 'Group controls',
      route: 'group-controls',
    },
  ];
}
