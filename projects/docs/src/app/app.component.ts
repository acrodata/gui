import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'docs';

  icons = ['menu', 'github', 'format_color_fill'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const i of this.icons) {
      iconRegistry.addSvgIcon(i, sanitizer.bypassSecurityTrustResourceUrl(`icons/${i}.svg`));
    }
  }
}
