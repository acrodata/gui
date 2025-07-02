import { GuiFields, GuiModule } from '@acrodata/gui';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-example-viewer',
  imports: [CommonModule, GuiModule, TextFieldModule, HighlightModule],
  templateUrl: './example-viewer.component.html',
  styleUrl: './example-viewer.component.scss',
})
export class ExampleViewerComponent {
  @Input() config: GuiFields = {};

  model = {};
}
