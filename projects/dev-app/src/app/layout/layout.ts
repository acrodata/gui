import { GuiCodeareaConfig } from '@acrodata/gui';
import { Directionality } from '@angular/cdk/bidi';
import { Component, OnInit, ViewEncapsulation, inject, DOCUMENT, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { jsonParseLinter } from '@codemirror/lang-json';
import { LanguageDescription } from '@codemirror/language';
import { lintGutter, linter } from '@codemirror/lint';
import { SettingsService } from '../settings.service';

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
];

@Component({
  selector: 'app-layout',
  imports: [RouterModule, MatSidenavModule, MatToolbarModule, MatButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Layout implements OnInit {
  private document = inject<Document>(DOCUMENT);
  private dir = inject(Directionality);
  private settings = inject(SettingsService);
  private codeareaCfg = inject(GuiCodeareaConfig);

  htmlElement = this.document.querySelector('html')!;
  darkThemeClass = 'dark-theme';
  isDark = signal(false);
  isRtl = signal(this.dir.value === 'rtl');

  ngOnInit(): void {
    this.codeareaCfg.languages = CODEAREA_LANGUAGES;
    this.codeareaCfg.extensions = data => {
      return data.language == 'json' ? [lintGutter(), linter(jsonParseLinter())] : [];
    };
  }

  toggleThemeClass() {
    this.isDark.update(v => !v);

    if (this.isDark()) {
      this.htmlElement.classList.add(this.darkThemeClass);
      this.codeareaCfg.theme = 'dark';
    } else {
      this.htmlElement.classList.remove(this.darkThemeClass);
      this.codeareaCfg.theme = 'light';
    }

    this.codeareaCfg.changes.next();
    this.settings.themeChange.next(this.isDark() ? 'dark' : 'light');
  }

  toggleRtl() {
    this.isRtl.update(v => !v);

    if (this.isRtl()) {
      this.htmlElement.dir = 'rtl';
    } else {
      this.htmlElement.dir = 'ltr';
    }
  }
}
