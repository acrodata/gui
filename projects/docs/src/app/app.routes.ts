import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'getting-started',
        loadComponent: () =>
          import('./pages/getting-started/getting-started.component').then(
            m => m.GettingStartedComponent
          ),
      },
      {
        path: 'basic-controls',
        loadComponent: () =>
          import('./pages/basic-controls/basic-controls.component').then(
            m => m.BasicControlsComponent
          ),
      },
      {
        path: 'media-controls',
        loadComponent: () =>
          import('./pages/media-controls/media-controls.component').then(
            m => m.MediaControlsComponent
          ),
      },
      {
        path: 'group-controls',
        loadComponent: () =>
          import('./pages/group-controls/group-controls.component').then(
            m => m.GroupControlsComponent
          ),
      },
    ],
  },
];
