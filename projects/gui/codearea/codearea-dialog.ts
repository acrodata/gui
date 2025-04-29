import { CodeEditor } from '@acrodata/code-editor';
import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GuiIconsRegistry } from '../gui-icons';
import { GuiIconButtonWrapper } from '../icon-button-wrapper/icon-button-wrapper';
import { GuiCodeareaDialogData } from './codearea';
import { GuiCodeareaConfig } from './codearea-config';

@Component({
  selector: 'gui-codearea-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    RndDialogDragHandle,
    CodeEditor,
    GuiIconButtonWrapper,
  ],
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

  langDesc = this.codeareaCfg.languages.find(lang =>
    lang.alias.includes(this.data.language.toLowerCase())
  );

  title = `${this.data.title || ''} (${this.langDesc?.name || 'Plain Text'})`;

  lineWrapping = false;

  constructor(
    private dialogRef: DialogRef<string, GuiCodeareaDialog>,
    @Inject(DIALOG_DATA) public data: GuiCodeareaDialogData,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private codeareaCfg: GuiCodeareaConfig,
    iconsRegistry: GuiIconsRegistry
  ) {
    iconsRegistry.add('wrap');

    this.codeareaCfg.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  toggleLineWrapping() {
    this.lineWrapping = !this.lineWrapping;
  }

  save() {
    this.dialogRef.close(this.data.value);
  }

  close() {
    this.dialogRef.close();
  }
}
