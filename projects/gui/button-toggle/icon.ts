import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-icon',
  styleUrls: ['./icon.scss'],
  template: `
    <img *ngIf="isUrl()" [src]="src" width="26" height="26" />
    <i *ngIf="!isUrl()" class="mdi mdi-{{ kebabCase(src) }}"></i>
  `,
  host: {
    class: 'gui-icon',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiIcon {
  @Input() src = '';

  // 简易判断是否是 URL 地址
  isUrl() {
    return /https?:\/\/.+/.test(this.src);
  }

  // 将下划线转为中划线
  kebabCase(str: string) {
    return str.replace(/_/g, '-');
  }
}
