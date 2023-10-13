import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GuiFileUploaderService {
  constructor(private http: HttpClient) {}

  /**
   * 文件上传接口
   *
   * @param type 业务类型 1: 大屏; 2: 报告; 3: 插件; 5: 模板; 6: 全局
   * @param id   业务 ID
   * @param file 文件数据
   * @returns
   */
  upload(type: 1 | 2 | 3 | 5 | 6, id: number | string, file: FormData) {
    return this.http.post<any>(`/sense-api/vi/file/singleUpload/${type}/${id}`, file, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
