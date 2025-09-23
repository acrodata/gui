import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'docs';

  icons = ['menu', 'github', 'invert_colors'];

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    for (const i of this.icons) {
      iconRegistry.addSvgIcon(i, sanitizer.bypassSecurityTrustResourceUrl(`icons/${i}.svg`));
    }
  }
}
