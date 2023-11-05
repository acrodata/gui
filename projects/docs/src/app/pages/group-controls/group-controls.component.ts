import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GuiFields } from '@acrodata/gui';
import { ExampleViewerComponent } from '../../shared';

@Component({
  selector: 'app-group-controls',
  standalone: true,
  imports: [CommonModule, ExampleViewerComponent],
  templateUrl: './group-controls.component.html',
  styleUrls: ['./group-controls.component.scss'],
})
export class GroupControlsComponent {
  groupConfig: GuiFields = {
    size: {
      type: 'group',
      name: 'Size',
      children: {
        width: {
          name: 'Width',
          type: 'number',
          default: 1920,
          suffix: 'px',
        },
        height: {
          name: 'Height',
          type: 'number',
          default: 1080,
          suffix: 'px',
        },
      },
    },
  };

  inlineConfig: GuiFields = {
    offset: {
      type: 'inline',
      name: 'Offset',
      children: {
        x: {
          name: 'X',
          type: 'number',
          default: 0,
          col: 50,
        },
        y: {
          name: 'Y',
          type: 'number',
          default: 0,
          col: 50,
        },
      },
    },
  };

  tabs1Config: GuiFields = {
    series: {
      type: 'tabs',
      name: 'Series',
      description: 'Dynamic add/delete',
      default: [
        { id: 1, name: 'bar' },
        { id: 2, name: 'foo' },
      ],
      template: {
        name: 'No.<%= i + 1 %>',
        children: {
          id: {
            type: 'number',
            name: 'ID',
          },
          name: {
            type: 'text',
            name: 'Name',
          },
        },
      },
    },
  };

  tabs2Config: GuiFields = {
    misc: {
      type: 'tabs',
      name: 'Misc',
      children: [
        {
          type: 'tab',
          name: 'Full Name',
          children: {
            firstName: {
              type: 'text',
              name: 'First Name',
              default: 'James',
            },
            lastName: {
              type: 'text',
              name: 'Last Name',
              default: 'Bob',
            },
          },
        },
        {
          type: 'tab',
          name: 'Contact',
          children: {
            phone: {
              type: 'number',
              name: 'Phone',
              default: 5550100,
            },
          },
        },
      ],
    },
  };

  menuConfig: GuiFields = {
    options: {
      type: 'menu',
      name: 'Menu',
      children: {
        menuA: {
          type: 'menuItem',
          name: 'Menu A',
          children: {
            textarea: {
              type: 'textarea',
              name: 'Comments',
              default: 'Hello world',
            },
          },
        },
        menuB: {
          type: 'menu',
          name: 'Menu B',
          children: {
            menuB1: {
              type: 'menuItem',
              name: 'Menu B1',
              children: {
                label: {
                  type: 'text',
                  name: 'Label',
                  default: 'Hello',
                },
              },
            },
            menuB2: {
              type: 'menuItem',
              name: 'Menu B2',
              children: {
                display: {
                  type: 'switch',
                  name: 'Display',
                  default: true,
                },
              },
            },
          },
        },
      },
    },
  };
}
