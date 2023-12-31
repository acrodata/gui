import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ExamplesComponent } from './examples/examples.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'examples', component: ExamplesComponent },
      { path: 'playground', component: PlaygroundComponent },
    ],
  },
];
