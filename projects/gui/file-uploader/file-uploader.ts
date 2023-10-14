import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GuiFileUploaderService } from './file-uploader.service';

export type FileUploadType = 'image' | 'video' | 'audio' | '*';

export interface FileUploadParams {
  type: 1 | 2 | 3 | 5 | 6; // 业务类型 1: 大屏; 2: 报告; 3: 插件; 5: 模板; 6: 全局
  id: number | string; // 大屏 ID、组件 ID、模板 ID 等
}

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
export class GuiFileUploader implements ControlValueAccessor, OnInit, OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() type: FileUploadType = '*';
  @Input() name = '';
  @Input() accept = '';
  @Input() params: FileUploadParams = { type: 1, id: 0 };
  @Input() disabled = false;

  @Output() fileChange = new EventEmitter<string>();

  // 图片或视频链接
  url = '';

  // 上传的文件
  file!: FileUploadContent;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private route: ActivatedRoute,
    private fileUploaderSrv: GuiFileUploaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.accept = this.type + '/*';
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // 默认从 URL 获取大屏 ID
      if (params['id']) {
        this.params.id = params['id'];
      }
    });
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

    this.fileUploaderSrv
      .upload(this.params.type, this.params.id, formData)
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

    // 重置输入框
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
