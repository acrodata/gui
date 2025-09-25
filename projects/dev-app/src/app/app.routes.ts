import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ExamplesComponent } from './examples/examples.component';
import { ControlsComponent } from './controls/controls.component';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'examples', component: ExamplesComponent },
      { path: 'controls', component: ControlsComponent },
      { path: 'playground', component: PlaygroundComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
