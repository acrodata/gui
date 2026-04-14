import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      {
        path: 'getting-started',
        loadComponent: () =>
          import('./pages/getting-started/getting-started').then(m => m.GettingStarted),
      },
      {
        path: 'basic-controls',
        loadComponent: () =>
          import('./pages/basic-controls/basic-controls').then(m => m.BasicControls),
      },
      {
        path: 'media-controls',
        loadComponent: () =>
          import('./pages/media-controls/media-controls').then(m => m.MediaControls),
      },
      {
        path: 'group-controls',
        loadComponent: () =>
          import('./pages/group-controls/group-controls').then(m => m.GroupControls),
      },
      {
        path: 'conditions',
        loadComponent: () => import('./pages/conditions/conditions').then(m => m.Conditions),
      },
      {
        path: 'playground',
        loadComponent: () => import('./pages/playground/playground').then(m => m.Playground),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
