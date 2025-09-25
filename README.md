# GUI

[![npm](https://img.shields.io/npm/v/@acrodata/gui.svg)](https://www.npmjs.com/package/@acrodata/gui)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/gui/blob/main/LICENSE)

![cover](https://github.com/acrodata/gui/assets/20625845/275f7f08-7971-4a4d-8fe8-ff8ead67beac)

JSON powered GUI for configurable panels.

#### Quick links

[Documentation](https://acrodata.github.io/gui/) |
[Playground](https://acrodata.github.io/gui/playground)

## Compatibility

| Angular  | @acrodata/gui | Theming |
| -------- | ------------- | ------- |
| >=20     | 3.x           | M2, M3  |
| >=18 <20 | 2.x           | M2, M3  |
| >=17 <18 | 1.x, 2.x      | M2      |
| >=16 <17 | 0.x           | M2      |

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

$theme: mat.define-theme(...);

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
import { GuiFields, GuiForm } from '@acrodata/gui';

@Component({
  selector: 'your-app',
  template: `<gui-form [config]="config" [model]="model" [form]="form" />`,
  standalone: true,
  imports: [GuiForm],
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
