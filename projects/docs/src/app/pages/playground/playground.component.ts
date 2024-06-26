import { CodeEditor } from '@acrodata/code-editor';
import { GuiFields, GuiForm } from '@acrodata/gui';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { MtxSplitModule } from '@ng-matero/extensions/split';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, FormsModule, MtxSplitModule, CodeEditor, GuiForm],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
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

  isMobile = false;

  private readonly destroy = inject(DestroyRef);

  extensions = [json(), linter(jsonParseLinter()), lintGutter()];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(result => {
        this.isMobile = result.matches;
        this.cdr.detectChanges();
      });

    this.configStr = JSON.stringify(this.config, null, 2);
  }

  onConfigChange() {
    this.config = JSON.parse(this.configStr);
  }
}
