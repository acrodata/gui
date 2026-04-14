import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ThemePicker } from '../shared';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, ThemePicker],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  host: {
    class: 'container-wrap',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Layout {
  private router = inject(Router);

  menu = [
    {
      name: 'Getting started',
      route: 'getting-started',
      children: [],
    },
    {
      name: 'Basic controls',
      route: 'basic-controls',
      children: [
        { name: 'Text', route: 'text' },
        { name: 'Number', route: 'number' },
        { name: 'Switch', route: 'switch' },
        { name: 'Slider', route: 'slider' },
        { name: 'Fill', route: 'fill' },
        { name: 'Select', route: 'select' },
        { name: 'Combobox', route: 'combobox' },
        { name: 'Button Toggle', route: 'button_toggle' },
        { name: 'Image Select', route: 'image_select' },
        { name: 'Textarea', route: 'textarea' },
        { name: 'Codearea', route: 'codearea' },
        { name: 'Hidden', route: 'hidden' },
      ],
    },
    {
      name: 'Group controls',
      route: 'group-controls',
      children: [
        { name: 'Group', route: 'group' },
        { name: 'Inline Group', route: 'inline_group' },
        { name: 'Tabs', route: 'tabs' },
        { name: 'Menu', route: 'menu' },
      ],
    },
    {
      name: 'Media controls',
      route: 'media-controls',
      children: [
        { name: 'Upload Settings', route: 'upload_settings' },
        { name: 'Image', route: 'image' },
        { name: 'Video', route: 'video' },
        { name: 'Audio', route: 'audio' },
        { name: 'File', route: 'file' },
      ],
    },
    {
      name: 'Conditions',
      route: 'conditions',
      children: [],
    },
    {
      name: 'Playground',
      route: 'playground',
      children: [],
    },
  ];

  menuOpened = false;

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      this.menuOpened = false;
    });
  }
}
