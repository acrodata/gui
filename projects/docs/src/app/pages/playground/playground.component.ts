import { CodeEditor } from '@acrodata/code-editor';
import { GuiFields, GuiForm } from '@acrodata/gui';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  private destroy = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);

  isMobile = false;

  config: GuiFields = {};
  model: any = {};

  configStr = '';

  extensions = [json(), linter(jsonParseLinter()), lintGutter()];

  examples = ['basic', 'css-gradient'];
  selectedExample = 'basic';

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(result => {
        this.isMobile = result.matches;
        this.cdr.detectChanges();
      });

    this.getExample();
  }

  getExample() {
    this.http.get<GuiFields>(`examples/${this.selectedExample}.json`).subscribe(res => {
      this.config = res;
      this.configStr = JSON.stringify(this.config, null, 2);
      this.model = {};
      this.cdr.detectChanges();
    });
  }

  onExampleChange() {
    this.getExample();
  }

  onConfigChange() {
    this.config = JSON.parse(this.configStr);
  }
}
