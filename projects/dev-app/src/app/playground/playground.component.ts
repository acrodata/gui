import { GuiConfigs, GuiModule } from '@acrodata/gui';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ng-monaco-editor';

@Component({
  standalone: true,
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  imports: [CommonModule, FormsModule, MonacoEditorModule, GuiModule],
})
export class PlaygroundComponent implements OnInit {
  form = new FormGroup({});
  config: GuiConfigs = {
    title: {
      name: '标题',
      type: 'text',
      default: '我是标题',
    },
  };
  model = {};
  value = {};

  configStr = '';

  ngOnInit(): void {
    this.configStr = JSON.stringify(this.config, null, 2);

    this.form.valueChanges.subscribe(v => {
      this.value = v;
    });
  }

  onConfigChange() {
    this.config = JSON.parse(this.configStr);
    this.model = this.value;
  }
}
