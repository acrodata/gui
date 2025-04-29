import { Theme } from '@acrodata/code-editor';
import { Injectable } from '@angular/core';
import { LanguageDescription } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuiCodeareaConfig {
  readonly changes: Subject<void> = new Subject<void>();

  theme: Theme = 'light';

  languages: LanguageDescription[] = [];

  extensions: Extension[] | ((language: string) => Extension[]) = [];
}
