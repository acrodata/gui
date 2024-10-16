import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gui-icon',
  template: `
    @if (isUrl()) {
      <img [src]="src" alt="" />
    } @else {
      <i [class]="src"></i>
    }
  `,
  styleUrl: './icon.scss',
  host: {
    class: 'gui-icon',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GuiIcon {
  @Input() src = '';

  isUrl() {
    return /^(https?:\/\/|\.?\/)\w+/.test(this.src);
  }
}
