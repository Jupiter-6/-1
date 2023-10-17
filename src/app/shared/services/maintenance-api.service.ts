import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class MaintenanceApiService extends BaseApi {

  constructor(
    protected injector: Injector,
    private http: _HttpClient,
  ) {
    super(injector);
  }

  /** 查询当前登录人的未下载维修任务 */
  @POST('/sws/app_maintenance/query_fordown.api')
  query_fordown(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 选择一个任务下载 */
  @POST('/sws/app_maintenance/download.api')
  download(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 上传维修列表zip */
  uploadZip(data: FormData): any {
    return this.http.post(environment.api_prefix + '/sws/app_maintenance/uploadzip.api', data);
  }

  /** 取消下载任务 */
  @POST('/sws/maintenance/canceldownload.api')
  canceldownload(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询维修历史 */
  @POST('/sws/maintenance/query.api')
  maintenanceHistory(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询多媒体信息 */
  @POST('/sws/maintenance_edoc/query.api')
  maintenance_edoc_query(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询并需要下载的配件接口 */
  @POST('/sws/maintenance_part/query.api')
  maintenance_part_query(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 泵房列表查询 */
  @POST('/sws/house/query.api')
  queryHouse(@Payload data: any): Observable<any> {
    return new Observable();
  }
}
