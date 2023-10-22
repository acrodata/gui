import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-icon',
  styleUrls: ['./icon.scss'],
  template: `
    <img *ngIf="isUrl()" [src]="src" />
    <i *ngIf="!isUrl()" [ngClass]="src"></i>
  `,
  host: {
    class: 'gui-icon',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiIcon {
  @Input() src = '';

  isUrl() {
    return /https?:\/\/.+/.test(this.src);
  }
}
