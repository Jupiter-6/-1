import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, FORM, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Inspection, InspectionDetail } from '@shared/entities/database.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix + '/sws')
export class InspectionApiService extends BaseApi {

  constructor(
    protected injector: Injector,
    private http: _HttpClient,
  ) {
    super(injector)
  }
  /** 查询当前登录人的未下载巡检路线列表 */
  @POST('/app_routetask/query_fordown.api')
  queryForDown(@Payload data: any): Observable<{ items: Inspection[] }> {
    return new Observable();
  }

  /** 下载巡检路线列表 */
  @POST('/app_routetask/download.api')
  download(@Payload data: any): Observable<{ item: InspectionDetail }> {
    return new Observable();
  }
  /** 上传巡检路线列表zip */
  upload(data: FormData) {
    return this.http.post(environment.api_prefix + '/sws/app_routetask/uploadzip.api', data)
  }
  /** 变更任务状态 */
  @POST('/routetask/updatestatus.api')
  updatestatus(@Payload data: any): Observable<{ code: string; item: InspectionDetail }> {
    return new Observable();
  }
  /** 任务顺序同步接口 */
  @POST('/itemtasksort/insert.api')
  itemTaskSort(@Payload data: any): Observable<{ code: string; item: InspectionDetail }> {
    return new Observable();
  }
  /** 更新任务下载状态 */
  @POST('/app_routetask/updatedownloadstatus.api')
  updatedownloadstatus(@Payload data: any): Observable<{ code: string; item: InspectionDetail }> {
    return new Observable();
  }
  /** 查询所有泵房任务 */

  /** 查询平台页面配置 */

  /** 获取tab特殊数据 */

  /** 查询所有路线任务 */


  /** 删除时查询任务状态 */

}
