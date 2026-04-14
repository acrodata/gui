import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Examples } from './examples/examples';
import { Controls } from './controls/controls';
import { Playground } from './playground/playground';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: Home },
      { path: 'examples', component: Examples },
      { path: 'controls', component: Controls },
      { path: 'playground', component: Playground },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
