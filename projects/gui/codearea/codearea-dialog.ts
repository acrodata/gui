import { CodeEditor } from '@acrodata/code-editor';
import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GuiCodeareaDialogData } from './codearea';

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
  constructor(
    private dialogRef: DialogRef<string, GuiCodeareaDialog>,
    @Inject(DIALOG_DATA) public data: GuiCodeareaDialogData
  ) {}

  save() {
    this.dialogRef.close(this.data.value);
  }

  close() {
    this.dialogRef.close();
  }
}
