import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuiModule } from '@acrodata/gui';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-example-viewer',
  standalone: true,
  imports: [CommonModule, GuiModule, MatInputModule, TextFieldModule],
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
})
export class ExampleViewerComponent {
  @Input() config = {};

  model = {};
}
