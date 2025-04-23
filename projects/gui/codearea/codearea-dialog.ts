import { CodeEditor } from '@acrodata/code-editor';
import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GuiCodeareaDialogData } from './codearea';
import { GuiCodeareaConfig } from './codearea-config';

@Component({
  selector: 'gui-codearea-dialog',
  standalone: true,
  imports: [FormsModule, A11yModule, MatButtonModule, RndDialogDragHandle, CodeEditor],
  templateUrl: './codearea-dialog.html',
  styleUrl: './codearea-dialog.scss',
  host: {
    class: 'gui-codearea-dialog',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiCodeareaDialog {
  get languages() {
    return this.codeareaCfg.languages;
  }

  get theme() {
    return this.codeareaCfg.theme;
  }

  constructor(
    private dialogRef: DialogRef<string, GuiCodeareaDialog>,
    @Inject(DIALOG_DATA) public data: GuiCodeareaDialogData,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private codeareaCfg: GuiCodeareaConfig
  ) {
    this.codeareaCfg.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  save() {
    this.dialogRef.close(this.data.value);
  }

  close() {
    this.dialogRef.close();
  }
}
