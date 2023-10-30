# GUI

[![npm](https://img.shields.io/npm/v/@acrodata/gui.svg)](https://www.npmjs.com/package/@acrodata/gui)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/gui/blob/main/LICENSE)

A lightweight GUI library for Angular.

## Installation

```bash
npm install @angular/material @ng-matero/extensions @acrodata/gui --save
```

## Setup

```ts
import { GuiModule } from '@acrodata/gui';

@NgModule({
  ...
  imports: [GuiModule, ...],
  ...
})
export class YourAppModule {
}
```

Define a theme with Angular Material's theming system. [More about theming](https://material.angular.io/guide/theming).

```scss
@use '@angular/material' as mat;
@use '@acrodata/gui' as gui;

@include mat.core();

$theme: mat.define-light-theme(...);

@include gui.all-control-themes($theme);
```

## Usage

```ts
import { Component } from '@angular/core';
import { GuiFields } from '@acrodata/gui';

@Component({
  selector: 'your-app',
  template: `<gui-form [config]="config" [model]="model" [form]="form"></gui-form>`,
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
