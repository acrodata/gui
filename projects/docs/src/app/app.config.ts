import { GuiCodeareaConfig } from '@acrodata/gui';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { LanguageDescription } from '@codemirror/language';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { routes } from './app.routes';

export const CODEAREA_LANGUAGES = [
  LanguageDescription.of({
    name: 'JSON',
    alias: ['json5'],
    extensions: ['json', 'map'],
    load: () => import('@codemirror/lang-json').then(m => m.json()),
  }),
  LanguageDescription.of({
    name: 'JavaScript',
    alias: ['ecmascript', 'js', 'node'],
    extensions: ['js', 'mjs', 'cjs'],
    load: () => import('@codemirror/lang-javascript').then(m => m.javascript()),
  }),
  LanguageDescription.of({
    name: 'CSS',
    extensions: ['css'],
    load: () => import('@codemirror/lang-css').then(m => m.css()),
  }),
  LanguageDescription.of({
    name: 'HTML',
    alias: ['xhtml'],
    extensions: ['html', 'htm', 'handlebars', 'hbs'],
    load: () => import('@codemirror/lang-html').then(m => m.html()),
  }),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideAnimations(),
    provideHttpClient(),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        scss: () => import('highlight.js/lib/languages/scss'),
        xml: () => import('highlight.js/lib/languages/xml'),
        json: () => import('highlight.js/lib/languages/json'),
        diff: () => import('highlight.js/lib/languages/diff'),
        bash: () => import('highlight.js/lib/languages/bash'),
      },
    }),
    {
      provide: GuiCodeareaConfig,
      useValue: {
        ...new GuiCodeareaConfig(),
        languages: CODEAREA_LANGUAGES,
      },
    },
  ],
};
