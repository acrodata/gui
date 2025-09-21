import { GuiCodeareaConfig } from '@acrodata/gui';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StyleManager } from '../style-manager/style-manager';
import { DocsSiteTheme, ThemeStorage } from './theme-storage';

@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrl: 'theme-picker.scss',
  host: {
    class: 'theme-picker',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatIconModule],
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  private styleManager = inject(StyleManager);
  private themeStorage = inject(ThemeStorage);
  private activatedRoute = inject(ActivatedRoute);
  private liveAnnouncer = inject(LiveAnnouncer);
  private cdr = inject(ChangeDetectorRef);
  private codeareaCfg = inject(GuiCodeareaConfig);

  private queryParamSubscription = Subscription.EMPTY;
  currentTheme: DocsSiteTheme | undefined;

  // The below colors need to align with the themes defined in theme-picker.scss
  themes: DocsSiteTheme[] = [
    {
      color: '#ffd9e1',
      displayName: '🌞 M3 (Rose & Red)',
      name: 'rose-red',
    },
    {
      color: '#d7e3ff',
      displayName: '🌞 M3 (Azure & Blue)',
      name: 'azure-blue',
      isDefault: true,
    },
    {
      color: '#810081',
      displayName: '🌚 M3 (Magenta & Violet)',
      name: 'magenta-violet',
      isDark: true,
    },
    {
      color: '#004f4f',
      displayName: '🌚 M3 (Cyan & Orange)',
      name: 'cyan-orange',
      isDark: true,
    },
    {
      color: '#673AB7',
      displayName: '🌞 M2 (Deep Purple & Amber)',
      name: 'deeppurple-amber',
    },
    {
      color: '#3F51B5',
      displayName: '🌞 M2 (Indigo & Pink)',
      name: 'indigo-pink',
    },
    {
      color: '#E91E63',
      displayName: '🌚 M2 (Pink & Blue-grey)',
      name: 'pink-bluegrey',
      isDark: true,
    },
    {
      color: '#9C27B0',
      displayName: '🌚 M2 (Purple & Green)',
      name: 'purple-green',
      isDark: true,
    },
  ];

  showMenu = false;

  constructor() {
    const themeName = this.themeStorage.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
    } else {
      this.themes.find(theme => {
        if (theme.isDefault === true) {
          this.selectTheme(theme.name);
        }
      });
    }
  }

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParamMap
      .pipe(map((params: ParamMap) => params.get('theme')))
      .subscribe((themeName: string | null) => {
        if (themeName) {
          this.selectTheme(themeName);
        }
      });

    fromEvent(document, 'click')
      .pipe(filter(event => event.target != document.querySelector('.theme-picker-menu')))
      .subscribe(v => {
        this.showMenu = false;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  selectTheme(themeName: string) {
    const theme =
      this.themes.find(currentTheme => currentTheme.name === themeName) ||
      this.themes.find(currentTheme => currentTheme.isDefault)!;

    this.currentTheme = theme;

    this.styleManager.setStyle('theme1', `themes/material/${theme.name}.css`);
    this.styleManager.setStyle('theme2', `themes/extensions/${theme.name}.css`);

    if (this.currentTheme) {
      this.liveAnnouncer.announce(`${theme.displayName} theme selected.`, 'polite', 3000);
      this.themeStorage.storeTheme(this.currentTheme);
    }

    this.codeareaCfg.theme = theme.isDark ? 'dark' : 'light';
    this.codeareaCfg.changes.next();

    this.showMenu = false;
  }

  toggleMenu(e: MouseEvent) {
    e.stopPropagation();
    this.showMenu = !this.showMenu;
  }
}
