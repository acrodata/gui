import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-icon',
  styleUrls: ['./icon.scss'],
  template: `
    <img *ngIf="isUrl()" [src]="src" />
    <i *ngIf="!isUrl()" [class]="src"></i>
  `,
  host: {
    class: 'gui-icon',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
})
export class GuiIcon {
  @Input() src = '';

  isUrl() {
    return /^(https?:\/\/|\.?\/)\w+/.test(this.src);
  }
}
