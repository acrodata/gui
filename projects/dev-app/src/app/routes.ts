import { Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'playground', component: PlaygroundComponent },
];
