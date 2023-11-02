import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MonacoEditorModule } from 'ng-monaco-editor';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      MonacoEditorModule.forRoot({
        baseUrl: 'assets/lib',
      })
    ),
  ],
}).catch(err => console.error(err));
