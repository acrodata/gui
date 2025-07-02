import { GuiModule } from '@acrodata/gui';
import { Component } from '@angular/core';

@Component({
  selector: 'app-controls',
  imports: [GuiModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {}
