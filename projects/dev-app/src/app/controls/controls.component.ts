import { GuiModule } from '@acrodata/gui';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [GuiModule],
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {}
