import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, Headers, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class RealtimeApiService extends BaseApi {

  constructor(
    protected injector: Injector,
    private http: _HttpClient,
  ) {
    super(injector);
  }

  /** 查询所有 */
  @POST('/sda/realtime/queryalarmwithattached.api')
  queryList(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 确认 */
  @POST('/sda/realtime/confirmList.api')
  confirm(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 延迟 */
  @POST('/sda/realtime/delay_action.api')
  delay(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 沉默/取消沉默 */
  @POST('/sda/realtime/silence_action.api')
  realTimeSilence(@Payload data: any): Observable<any> {
    return new Observable();
  }

   /** 泵房沉默 */
   @POST('/sws/house/silence_action.api')
   houseSilence(@Payload data: any): Observable<any> {
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

  /** 查询设备 */
  @POST('/sws/device/query.api')
  deviceQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 维修小组 */
  @POST('/sws/team/query.api')
  queryTeam(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 创建事件 */
  @POST('/sws/maintenance/create.api')
  create(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 工单保存 */
  @POST('/sws/maintenance/insert.api')
  doInsert(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 工单保存并发布 */
  @POST('/sws/maintenance/insertAndpublish.api')
  insertAndpublish(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 数据类型 */
  @POST('/sda/datatype/query.api')
  queryDataType(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 设备规则 */
  @POST('/sda/devicerule/query.api')
  queryDevicerule(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 传感器规则 */
  @POST('/sda/sensorrule/query.api')
  querySensorrule(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 维修工单 */
  @POST('/sws/maintenance/query.api')
  maintenanceWorkOrder(@Payload data: any): Observable<any> {
    return new Observable();
  }

}
