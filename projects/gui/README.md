# GUI

[![npm](https://img.shields.io/npm/v/@acrodata/gui.svg)](https://www.npmjs.com/package/@acrodata/gui)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/gui/blob/main/LICENSE)

![cover](https://github.com/acrodata/gui/assets/20625845/275f7f08-7971-4a4d-8fe8-ff8ead67beac)

JSON powered GUI for configurable panels.

#### Quick links

[Documentation](https://acrodata.github.io/gui/) |
[Playground](https://acrodata.github.io/gui/playground)

## Compatibility

| Angular  | @acrodata/gui |
| -------- | ------------- |
| >=17.0.0 | 1.x           |
| >=16.0.0 | 0.x           |

## Installation

```bash
npm install @angular/material @ng-matero/extensions @acrodata/gui --save
```

## Setup

Define a theme with Angular Material's theming system. [More about theming](https://material.angular.io/guide/theming).

```scss
@use '@angular/material' as mat;
@use '@acrodata/gui' as gui;

@include mat.core();

$theme: mat.define-light-theme(...);

@include gui.all-control-themes($theme);
```

🚨 If you use the Angular Material as default library and have included all component themes, there's no need to include the GUI themes anymore.

```diff
+ @include mat.all-component-themes($theme);
+ @include mtx.all-component-themes($theme);
- @include gui.all-control-themes($theme);
```

## Usage

```ts
import { Component } from '@angular/core';
import { GuiModule, GuiFields } from '@acrodata/gui';

@Component({
  selector: 'your-app',
  template: `<gui-form [config]="config" [model]="model" [form]="form"></gui-form>`,
  standalone: true,
  imports: [GuiModule],
})
export class YourAppComponent {
  config: GuiFields = {
    title: {
      type: 'text',
      name: 'Title',
      default: 'I am title',
    },
  };
  model = {};
  form = new FormGroup({});
}
```

## License

MIT
