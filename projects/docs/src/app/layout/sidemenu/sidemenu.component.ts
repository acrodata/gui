import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
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
        { name: 'Button Toggle', route: 'button_toggle' },
        { name: 'Textarea', route: 'textarea' },
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
        { name: 'Image', route: 'image' },
        { name: 'Video', route: 'video' },
        { name: 'Audio', route: 'audio' },
        { name: 'File', route: 'file' },
      ],
    },
  ];
}
