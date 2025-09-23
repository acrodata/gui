import { GuiFillMode, GuiModule } from '@acrodata/gui';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  imports: [FormsModule, GuiModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  fillValue = 'red';
  fillType: GuiFillMode = 'all';
}
