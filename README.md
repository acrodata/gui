# GUI

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

You should define a theme for Material and Material Extensions by yourself.

```scss
@use '@angular/material' as mat;
@use '@ng-matero/extensions' as mtx;

$theme: mat.define-light-theme(...);

@include mat.all-component-themes($theme);
@include mtx.all-component-themes($theme);
```

Or you can also import the prebuilt themes.

```css
@import '@angular/material/prebuilt-themes/indigo-pink.css';
@import '@ng-matero/extensions/prebuilt-themes/indigo-pink.css';
```

## Usage

```ts
import { Component } from '@angular/core';
import { GuiConfigs } from '@acrodata/gui';

@Component({
  selector: 'your-app',
  template: `<gui-form [config]="config" [model]="model"></gui-form>`,
})
export class YourAppComponent {
  config: GuiConfigs = {
    title: {
      type: 'text',
      name: 'Title',
      default: 'I am title',
    },
  };
  model = {};
}
```

## License

MIT
