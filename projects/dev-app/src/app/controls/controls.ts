import { GuiFillMode, GuiModule } from '@acrodata/gui';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  imports: [FormsModule, GuiModule],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  fillValue = 'red';
  fillType: GuiFillMode = 'all';
}
