import { CodeEditor, Theme } from '@acrodata/code-editor';
import { GuiFields, GuiForm } from '@acrodata/gui';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule } from '@angular/forms';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-playground',
  imports: [CommonModule, FormsModule, CodeEditor, GuiForm],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
})
export class PlaygroundComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private settings = inject(SettingsService);

  form = new FormGroup({});
  config: GuiFields = {
    title: {
      type: 'text',
      name: '标题',
      default: '我是标题',
    },
    align: {
      type: 'buttonToggle',
      name: '对齐方式',
      options: [
        { value: 'left', label: '左对齐' },
        { value: 'center', label: '居中对齐' },
        { value: 'right', label: '右对齐' },
      ],
      default: 'center',
    },
    size: {
      type: 'group',
      name: '尺寸',
      children: {
        width: {
          type: 'number',
          name: '宽度',
          default: 100,
        },
        height: {
          type: 'number',
          name: '高度',
          default: 100,
        },
      },
    },
  };
  model: any = {};

  configStr = '';

  theme: Theme = 'light';

  extensions = [json(), linter(jsonParseLinter()), lintGutter()];

  ngOnInit(): void {
    this.configStr = JSON.stringify(this.config, null, 2);

    this.form.valueChanges.subscribe(v => {
      console.log(v);
    });

    this.settings.themeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(theme => {
      this.theme = theme;
    });
  }

  onConfigChange() {
    this.config = JSON.parse(this.configStr);
  }
}
