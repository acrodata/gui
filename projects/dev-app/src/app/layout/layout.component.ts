import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Directionality } from '@angular/cdk/bidi';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatButtonModule],
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
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.htmlElement = this.document.querySelector('html')!;
    this.isRtl = this.dir.value === 'rtl';
  }

  toggleThemeClass() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this.htmlElement.classList.add(this.darkThemeClass);
    } else {
      this.htmlElement.classList.remove(this.darkThemeClass);
    }

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
