import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, FORM, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Inspection, InspectionDetail } from '@shared/entities/database.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix + '/sda')
export class WatermainsService extends BaseApi {
  sensor: any;
  /** 采集器数据 */
  @POST('/dw/lastvalue/query_appStationModel.api')
  query_appStationModel(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 获取区域 */
  @POST('/dma/query.api')
  dmaQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 采集器报警 */
  @POST('/realtime/query_apprealtime.api')
  query_apprealtime(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 采集器查询 */
  @POST('/sensor/appqueryenabled.api')
  appqueryenabled(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 分钟级数据查询 */
  @POST('/dw/minute/queryoneday.api')
  queryoneday(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 查询数据类型 */
  @POST('/datatype/query_forcache.api')
  datatypeQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }
}
