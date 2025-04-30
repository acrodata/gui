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
      name: 'Title',
      default: 'Hello, World!',
    },
    align: {
      type: 'buttonToggle',
      name: 'Align',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'center',
    },
    size: {
      type: 'group',
      name: 'Size',
      children: {
        width: {
          type: 'number',
          name: 'Width',
          default: 100,
        },
        height: {
          type: 'number',
          name: 'Height',
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
