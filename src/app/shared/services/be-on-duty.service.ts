import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, FORM, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class BeOnDutyService extends BaseApi {

  /** 查询值班信息 */
  @POST('/sda/dutyplan/querylist2.api')
  queryPlan(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询签到信息 */
  @POST('/sda/dutySign/querylist.api')
  querydutysign(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 签到上班 */
  @POST('/sda/dutysign/bsign.api')
  bsign(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 签到下班 */
  @POST('/sda/dutysign/esign.api')
  esign(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询值班公告 */
  @POST('/sda/dutynotice/querylist.api')
  queryDutynotice(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询公告内容 */
  @POST('/sda/dutynotice/read.api')
  readNotice(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询值班通知 */
  @POST('/sda/dutyadvice/querylist.api')
  queryDutyadvice(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询通知内容 */
  @POST('/sda/dutyadvice/read.api')
  readAdvice(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询值班日志 */
  @POST('/sda/dutylog/querylist.api')
  queryDutylog(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询值班日志内容 */
  @POST('/sda/dutylog/read.api')
  readDutylog(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 创建值班日志 */
  @POST('/sda/dutylog/create.api')
  creatLog(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 创建值班日志 */
  @POST('/sda/dutylog/insert.api')
  insertLog(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 根据token获取edocid */
  @POST('/itsys/edoc_document/add.api')
  getEdocid(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 根据token获取edocid */
  @POST('/sda/dutyplan/mayplantolog.api')
  getmMayPlantolog(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 查询通知列表 */
  @POST('/sda/dutyadvice/query.api')
  getNotificationList(@Payload data: any): Observable<any> {
    return new Observable();
  }
}
