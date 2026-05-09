import { CodeEditor } from '@acrodata/code-editor';
import { getModelFromConfig, GuiFields, GuiForm } from '@acrodata/gui';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, linkedSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { MtxSplitModule } from '@ng-matero/extensions/split';

@Component({
  selector: 'app-playground',
  imports: [CommonModule, FormsModule, MtxSplitModule, CodeEditor, GuiForm],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
})
export class Playground implements OnInit {
  private destroy = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  private http = inject(HttpClient);

  isMobile = signal(false);

  config = signal<GuiFields>({});
  model = signal<any>({});

  configStr = linkedSignal(() => JSON.stringify(this.config(), null, 2));

  extensions = [json(), linter(jsonParseLinter()), lintGutter()];

  examples = [
    { label: 'Baisc', value: 'basic' },
    { label: 'CSS Gradient', value: 'css-gradient' },
  ];
  selectedExample = signal('basic');

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });

    this.getExample();
  }

  getExample() {
    this.http.get<GuiFields>(`examples/${this.selectedExample()}.json`).subscribe(res => {
      this.config.set(res);
      this.model.set({});
    });
  }

  onExampleChange() {
    this.getExample();
  }

  onConfigChange() {
    const config = JSON.parse(this.configStr());
    this.config.set(config);
    this.model.set(getModelFromConfig(config));
  }
}
