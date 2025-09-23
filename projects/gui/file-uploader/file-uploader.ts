import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatHint, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { finalize } from 'rxjs/operators';

import { GuiFieldLabel } from '../field-label/field-label';
import { GuiIconsRegistry } from '../gui-icons';
import { GuiIconButtonWrapper } from '../icon-button-wrapper/icon-button-wrapper';
import { GuiControl } from '../interface';
import { GuiFileUploaderConfig } from './file-uploader-config';

export type FileUploadType = 'image' | 'video' | 'audio' | '*';

export interface FileUploadContent {
  data: File;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'gui-file-uploader',
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.scss',
  host: {
    class: 'gui-field gui-file-uploader',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuiFileUploader),
      multi: true,
    },
  ],
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatPrefix,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatHint,
    GuiFieldLabel,
    GuiIconButtonWrapper,
  ],
})
export class GuiFileUploader implements ControlValueAccessor, OnChanges {
  private fileUploaderCfg = inject(GuiFileUploaderConfig);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;
  @Input() type: FileUploadType = '*';
  @Input() name = '';
  @Input() accept = '';

  @Output() fileChange = new EventEmitter<string>();

  // file url that returned from the server
  url = '';

  // file to upload
  fileUpload!: FileUploadContent;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    const iconsRegistry = inject(GuiIconsRegistry);
    iconsRegistry.add('link', 'clear', 'file', 'upload');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] || changes['accept'] || changes['type']) {
      this.accept = this.config.accept || this.accept || this.type + '/*';
    }
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      this.url = value.trim();
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  upload(fileUpload: FileUploadContent) {
    const formData = new FormData();
    formData.append('file', fileUpload.data);

    fileUpload.inProgress = true;

    this.fileUploaderCfg
      .upload(formData, this.config)
      .pipe(
        finalize(() => {
          fileUpload.inProgress = false;
        })
      )
      .subscribe(result => {
        if (result) {
          this.url = result;
          this.cdr.detectChanges();

          this.onChange(this.url);
          this.onTouched();

          this.fileChange.emit(this.url);
        }
      });
  }

  onUrlChange(e: Event) {
    this.url = (e.target as HTMLInputElement).value.trim();

    this.onChange(this.url);

    this.fileChange.emit(this.url);
  }

  onFileChange(e: Event) {
    this.fileUpload = {
      data: (e.target as HTMLInputElement).files![0],
      inProgress: false,
      progress: 0,
    };

    this.upload(this.fileUpload);

    // reset input value
    (e.target as HTMLInputElement).value = '';
  }

  onBlur() {
    this.onTouched();
  }

  onClear() {
    this.url = '';

    this.onChange(this.url);
    this.onTouched();

    this.fileChange.emit(this.url);
  }
}
