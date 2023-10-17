import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, Headers, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class BreakdownApiService extends BaseApi {

  constructor(
    protected injector: Injector,
    private http: _HttpClient,
  ) {
    super(injector);
  }

  /** 查询我的上报 */
  @POST('/sws/event/appquery.api')
  appquery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 选中一个我的上报后查看历史上报 */
  @POST('/sws/event/appread.api')
  appread(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 泵房列表查询 */
  @POST('/sws/house/query.api')
  queryHouse(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 根据泵房ID查询泵区 */
  @POST('/sws/parea/query.api')
  pareaQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 根据泵区ID查询设备 */
  @POST('/sws/device/query.api')
  deviceQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  // /** 上传zip */
  // @POST('/sws/app_maintenance/uploadzip.api')
  // uploadZip(
  //   @Payload data: any,
  //   @Headers('Content-Type') type: string,
  //   @Headers('Content-Type') noCode: boolean,
  //   @Headers('Content-Type') post: any): Observable<any> {
  //   return new Observable();
  // }

  /** 上传故障列表zip */
  uploadZip(data: FormData): any {
    return this.http.post(environment.api_prefix + '/sws/app_maintenance/uploadzip.api', data);
  }


}
