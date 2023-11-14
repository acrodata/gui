import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GuiFileUploaderConfig } from './file-uploader-config';
import { GuiControl } from '../interface';

export type FileUploadType = 'image' | 'video' | 'audio' | '*';

export interface FileUploadContent {
  data: File;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'gui-file-uploader',
  templateUrl: './file-uploader.html',
  styleUrls: ['./file-uploader.scss'],
  host: {
    class: 'gui-file-uploader',
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
})
export class GuiFileUploader implements ControlValueAccessor, OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() config: Partial<GuiControl> = {};
  @Input() disabled = false;
  @Input() type: FileUploadType = '*';
  @Input() name = '';
  @Input() accept = '';

  @Output() fileChange = new EventEmitter<string>();

  // media src
  url = '';

  // file to upload
  file!: FileUploadContent;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private fileUploaderCfg: GuiFileUploaderConfig,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.accept = this.type + '/*';
    }
  }

  writeValue(value: string) {
    this.url = value;
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

  upload(file: FileUploadContent) {
    const formData = new FormData();
    formData.append('file', file.data || '');

    file.inProgress = true;

    this.fileUploaderCfg
      .upload(formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data?.name || 'File'} upload failed.`);
        }),
        finalize(() => {})
      )
      .subscribe(res => {
        if (res instanceof HttpResponse && res.body) {
          this.url = res.body.data;

          this.onChange(this.url);
          this.onTouched();

          this.fileChange.emit(this.url);
        }

        this.cdr.detectChanges();
      });
  }

  onUrlChange(e: Event) {
    this.url = (e.target as HTMLInputElement).value;

    this.onChange(this.url);

    this.fileChange.emit(this.url);
  }

  onFileChange(e: Event) {
    this.file = {
      data: (e.target as HTMLInputElement).files![0],
      inProgress: false,
      progress: 0,
    };

    this.upload(this.file);

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
