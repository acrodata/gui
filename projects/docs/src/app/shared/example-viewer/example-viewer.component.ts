import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuiFields, GuiModule } from '@acrodata/gui';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-example-viewer',
  standalone: true,
  imports: [CommonModule, GuiModule, MatInputModule, TextFieldModule, HighlightModule],
  templateUrl: './example-viewer.component.html',
  styleUrl: './example-viewer.component.scss',
})
export class ExampleViewerComponent {
  @Input() config: GuiFields = {};

  model = {};
}
