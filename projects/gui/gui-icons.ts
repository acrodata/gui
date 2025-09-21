import { Injectable, InjectionToken, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const svgIcons = {
  horizontal: `
  <svg viewBox="0 0 24 24">
    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"></path>
  </svg>
  `,
  vertical: `
  <svg viewBox="0 0 24 24">
    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>
  </svg>
  `,
  add: `
  <svg viewBox="0 0 24 24">
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
  </svg>
  `,
  delete: `
  <svg viewBox="0 0 24 24">
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"></path>
  </svg>
  `,
  copy: `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
  </svg>
  `,
  link: `
  <svg viewBox="0 0 24 24">
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
  </svg>
  `,
  clear: `
  <svg viewBox="0 0 24 24">
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
  </svg>
  `,
  file: `
  <svg viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
  </svg>
  `,
  upload: `
  <svg viewBox="0 0 24 24">
    <path d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"></path>
  </svg>
  `,
  expand: `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"></path>
  </svg>`,
  wrap: `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,5H3V7H21V5M3,19H10V17H3V19M3,13H18C19,13 20,13.43 20,15C20,16.57 19,17 18,17H16V15L12,18L16,21V19H18C20.95,19 22,17.73 22,15C22,12.28 21,11 18,11H3V13Z"></path>
  </svg>`,
  solid: `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" fill-rule="evenodd" d="M9 9h6v6H9z"></path>
    <path fill="currentColor" fill-rule="evenodd" d="M8 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1M6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm3 7V9h6v6zM8 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"></path>
  </svg>`,
  gradient: `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" fill-rule="evenodd" d="M8 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1M6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm3.75.875a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0m3.791.625a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25m-1.458.875a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m0 3.12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.458 2.245a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25m.625-3.865a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0M8.875 15.99a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75m.875-4.115a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0m5.75-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m.5 2.623a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"></path>
  </svg>`,
  image: `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" fill-rule="evenodd" d="M16 7H8a1 1 0 0 0-1 1v5.668l2.521-2.522a.5.5 0 0 1 .708 0l5.85 5.85A1 1 0 0 0 17 16V8a1 1 0 0 0-1-1M6 14.875V16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2zM8 17h6.668l-4.793-4.793L7 15.082V16a1 1 0 0 0 1 1m7-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0m1 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
  </svg>
  `,
};

export type GuiIconType = keyof typeof svgIcons;

export type GuiIconsConfig = Record<GuiIconType, string>;

/** Injection token that can be used to provide the default icons. */
export const GUI_ICONS_CONFIG = new InjectionToken<GuiIconsConfig>('gui-icons-config');

@Injectable({ providedIn: 'root' })
export class GuiIconsRegistry {
  private _iconRegistry = inject(MatIconRegistry);
  private _sanitizer = inject(DomSanitizer);
  private _defaultIcons = inject<GuiIconsConfig>(GUI_ICONS_CONFIG, { optional: true });

  add(...iconNames: GuiIconType[]) {
    const icons = Object.assign(svgIcons, this._defaultIcons);
    iconNames.forEach(k => {
      this._iconRegistry.addSvgIconLiteral(k, this._sanitizer.bypassSecurityTrustHtml(icons[k]));
    });
  }
}
