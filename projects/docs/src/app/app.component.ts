import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'docs';

  icons = ['menu', 'github'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const i of this.icons) {
      iconRegistry.addSvgIcon(i, sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${i}.svg`));
    }
  }
}
