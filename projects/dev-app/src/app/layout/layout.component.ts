import { GuiCodeareaConfig } from '@acrodata/gui';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LanguageDescription } from '@codemirror/language';
import { SettingsService } from '../settings.service';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';

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
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatToolbarModule, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  htmlElement!: HTMLHtmlElement;
  darkThemeClass = 'dark-theme';
  isDark = false;
  isRtl = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dir: Directionality,
    private settings: SettingsService,
    private codeareaCfg: GuiCodeareaConfig
  ) {}

  ngOnInit(): void {
    this.htmlElement = this.document.querySelector('html')!;
    this.isRtl = this.dir.value === 'rtl';
    this.codeareaCfg.languages = CODEAREA_LANGUAGES;
    this.codeareaCfg.extensions = data => {
      return data.language == 'json' ? [lintGutter(), linter(jsonParseLinter())] : [];
    };
  }

  toggleThemeClass() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this.htmlElement.classList.add(this.darkThemeClass);
      this.codeareaCfg.theme = 'dark';
    } else {
      this.htmlElement.classList.remove(this.darkThemeClass);
      this.codeareaCfg.theme = 'light';
    }

    this.codeareaCfg.changes.next();
    this.settings.themeChange.next(this.isDark ? 'dark' : 'light');
  }

  toggleRtl() {
    this.isRtl = !this.isRtl;

    if (this.isRtl) {
      this.htmlElement.dir = 'rtl';
    } else {
      this.htmlElement.dir = 'ltr';
    }
  }
}
