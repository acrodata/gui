import { GuiFields, GuiModule } from '@acrodata/gui';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule } from '@angular/forms';
import { MonacoEditorModule, MonacoProviderService } from 'ng-monaco-editor';
import { SettingsService } from '../settings.service';

@Component({
  standalone: true,
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  imports: [CommonModule, FormsModule, MonacoEditorModule, GuiModule],
})
export class PlaygroundComponent implements OnInit {
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

  constructor(
    private destroyRef: DestroyRef,
    private settings: SettingsService,
    private monacoProvider: MonacoProviderService
  ) {}

  ngOnInit(): void {
    this.configStr = JSON.stringify(this.config, null, 2);

    this.form.valueChanges.subscribe(v => {
      console.log(v);
    });

    this.settings.themeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(theme => {
      if (theme === 'dark') {
        this.monacoProvider.changeTheme('vs-dark');
      } else {
        this.monacoProvider.changeTheme('vs');
      }
    });
  }

  onConfigChange() {
    this.config = JSON.parse(this.configStr);
  }
}
