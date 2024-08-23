import { Injectable, EventEmitter } from '@angular/core';

export interface DocsSiteTheme {
  name: string;
  displayName?: string;
  color: string;
  isDefault?: boolean;
  isDark?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
  static storageKey = 'docs-theme';

  onThemeUpdate: EventEmitter<DocsSiteTheme> = new EventEmitter<DocsSiteTheme>();

  storeTheme(theme: DocsSiteTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch {
      //
    }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch {
      //
    }
  }
}
