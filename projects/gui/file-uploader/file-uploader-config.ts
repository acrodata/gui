import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GuiFileUploaderConfig {
  constructor(private http: HttpClient) {}

  /**
   *  The file upload URL
   */
  url = '';

  /**
   * The file upload params
   */
  params: any = {};

  /**
   * The File upload API
   *
   * @param file file data
   * @returns
   */
  upload(file: FormData) {
    return this.http.post<any>(this.url, file, {
      reportProgress: true,
      observe: 'events',
      params: this.params,
    });
  }
}
