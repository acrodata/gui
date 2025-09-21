import { CodeEditor } from '@acrodata/code-editor';
import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GuiIconsRegistry } from '../gui-icons';
import { GuiIconButtonWrapper } from '../icon-button-wrapper/icon-button-wrapper';
import { GuiCodeareaConfig } from './codearea-config';

export interface GuiCodeareaDialogData {
  value: string;
  disabled?: boolean;
  readonly?: boolean;
  language?: string;
  title?: string;
}

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
  private dialogRef = inject<DialogRef<string, GuiCodeareaDialog>>(DialogRef);
  data = inject<GuiCodeareaDialogData>(DIALOG_DATA);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private codeareaCfg = inject(GuiCodeareaConfig);

  get languages() {
    return this.codeareaCfg.languages;
  }

  get theme() {
    return this.codeareaCfg.theme;
  }

  get extensions() {
    return typeof this.codeareaCfg.extensions === 'function'
      ? this.codeareaCfg.extensions(this.data)
      : this.codeareaCfg.extensions;
  }

  langDesc = this.codeareaCfg.languages.find(
    lang => this.data.language && lang.alias.includes(this.data.language.toLowerCase())
  );

  title = `${this.data.title || ''} (${this.langDesc?.name || 'Plain Text'})`;

  lineWrapping = false;

  constructor() {
    const iconsRegistry = inject(GuiIconsRegistry);
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
