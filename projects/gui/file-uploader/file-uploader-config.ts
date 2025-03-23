import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
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
   * @param formData The FormData with file binary
   * @param config   The custom upload config that passed from component input
   * @returns
   */
  upload(formData: FormData, config: Record<string, any>) {
    return this.http.post<any>(this.url, formData, {
      reportProgress: true,
      observe: 'events',
      params: this.params,
    });
  }
}
