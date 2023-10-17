import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, Payload, POST } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class SdaApiService extends BaseApi {
  /** 根据传感器编号查询实时数据   sensornos多个用小逗号分割 */
  @POST('/sda/dw/lastvalue/query.api')
  queryLastvalue(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /*
   * 根据sensornos查询对应的sensor实体
   * sensornos多个用小逗号分割
   * stationid = 泵房id
   */
  @POST('/sda/sensor/queryenabled.api')
  queryenabled(@Payload data: any): Observable<any> {
    return new Observable();
  }
  @POST('/sda/sensor/query_forcache.api')
  sensor_query_forcache(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /*
   * 根据sensorids查询日内分钟数据
   */
  @POST('/sda/dw/minute/queryoneday_sensors.api')
  queryoneday_sensors(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 按厂站编码取有效工艺列表 */
  @POST('/sda/process/queryenabled.api')
  processQueryenabled(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 获取svg与脚本 */
  @POST('/sda/processdraw/readbyno.api')
  processdrawReadbyno(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** dma相关数据 */
  @POST('/sda/dma/querysecondary.api')
  querysecondary(@Payload data: any): Observable<any> {
    return new Observable();
  }
}
