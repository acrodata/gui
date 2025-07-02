import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { GuiControl } from '../interface';

export interface FileUploadResponseBody {
  bytes: number;
  mime: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class GuiFileUploaderConfig {
  protected http = inject(HttpClient);

  /**
   *  The file upload URL
   */
  url = '';

  /**
   * The File upload API
   *
   * @param formData The FormData with file binary
   * @param config   The custom upload config that passed from component input
   * @returns        The uploaded file url stream
   */
  upload(formData: FormData, config: Partial<GuiControl>) {
    return this.http
      .post<FileUploadResponseBody>(this.url, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map(res => {
          if (res instanceof HttpResponse && res.body) {
            return res.body.url;
          }
          return null;
        })
      );
  }
}
