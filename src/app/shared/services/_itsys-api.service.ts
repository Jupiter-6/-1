import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, GET, Path, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class ItsysApiService extends BaseApi {
  constructor(protected injector: Injector, private http: _HttpClient) {
    super(injector);
  }

  /** 缓存所有用户的id-name */
  userid_name_map: any = {};

  optselect: any = [];
  /** 菜单缓存 */
  private menus: any[] = [];
  getMenus() {
    return this.menus;
  }
  setMenus(menus: any[]) {
    this.menus = menus;
  }
  /** 菜单查询 */
  @POST('/itsys/menu/query.api')
  menuQuery(): Observable<any> {
    return new Observable();
  }

  /** 根据传感器编号查询实时数据   sensornos多个用小逗号分割 */
  @POST('/itsys/option/query.api')
  queryOption(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询我的收藏夹关于泵区的 */
  @POST('/itsys/favorite/query.api')
  favoriteQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 添加收藏 */
  @POST('/itsys/favorite/add.api')
  favoriteAdd(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 取消收藏 */
  @POST('/itsys/favorite/cancel.api')
  favoriteCancel(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询用户缓存 */
  @POST('/itsys/user/queryall.api')
  userQueryall(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 获取所有用户 */
  async getUsers(): Promise<any> {
    if (Object.keys(this.userid_name_map).length > 0) {
      return this.userid_name_map;
    } else {
      await this.userQueryall({}).toPromise().then((res) => {
        if (res.code === '0') {
          res.items.forEach((item: any) => {
            this.userid_name_map[item.id] = item;
          });
        }
      });
      return this.userid_name_map;
    }
  }

  /** 查询所有字典 */
  @POST('/itsys/optselect/query_forcache.api')
  optselectQuery_forcach(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询所有optselect */
  async queryOptselect(): Promise<any> {
    if (this.optselect.length === 0) {
      await this.optselectQuery_forcach({}).toPromise().then((res) => {
        if (res.code === '0') {
          this.optselect = res.items;
        }
      });
    }
    return this.optselect;
  }

  /** 获取Failclass */
  async getFailclass(): Promise<any> {
    const failclassMap: any = {};
    await this.queryOptselect().then((items) => {
      items.filter(
        (i: any) => i.optselectno === 'sws_maintenance.failclass',
      )[0].options.forEach((item: any) => {
        failclassMap[item.value] = item.label;
      });
    });
    return failclassMap;
  }

  /** 获取Failclass */
  async getFailclassList(): Promise<any> {
    let failclassList: any = [];
    await this.queryOptselect().then((items) => {
      failclassList = items.filter(
        (i: any) => i.optselectno === 'sws_maintenance.failclass',
      )[0].options;
    });
    return failclassList;
  }

  /** 获取延迟天数 */
  async getRealtimeDelay(): Promise<any> {
    let list: any = [];
    await this.queryOptselect().then((items) => {
      list = items.filter(
        (i: any) => i.optselectno === 'sda.alarmcenter.realtime.delay',
      )[0].options;
    });
    return list;
  }

   /** 获取泵房沉默天数 */
   async getHouseSilence(): Promise<any> {
    let list: any = [];
    await this.queryOptselect().then((items) => {
      list = items.filter(
        (i: any) => i.optselectno === 'sda.alarmcenter.house.silence',
      )[0].options;
    });
    return list;
  }

  /** 获取维修来源 */
  async getMtsource(): Promise<any> {
    let list: any = [];
    await this.queryOptselect().then((items) => {
      list = items.filter(
        (i: any) => i.optselectno === 'sws_maintenance.mtsource',
      )[0].options;
    });
    return list;
  }


  /** 获取Eventclass */
  async getEventclass(): Promise<any> {
    let eventItems: any = [];
    await this.queryOptselect().then((items) => {
      items = items.filter((item: any) => item.optselectno === 'sws_event.eventcls');
      if (items.length) {
        eventItems = items[0].options
          .map((item: any) => ({ value: item.value, label: item.label }));
      }
      // eventItems = items.filter((item: any) =>
      //   item.optselectno === 'sws_event.eventcls')[0].options
      //   .map((item: any) => ({ value: item.value, label: item.label }));
    });
    return eventItems;
  }

  /** 获取Eventclass */
  async getSdaEventclass(): Promise<any> {
    let eventItems: any = [];
    await this.queryOptselect().then((items) => {
      items = items.filter((item: any) => item.optselectno === 'sda_event.eventcls');
      if (items.length) {
        eventItems = items[0].options
          .map((item: any) => ({ value: item.value, label: item.label }));
      }
      // eventItems = items.filter((item: any) =>
      //   item.optselectno === 'sws_event.eventcls')[0].options
      //   .map((item: any) => ({ value: item.value, label: item.label }));
    });
    return eventItems;
  }

  /** 获取sda 工单故障分类 */
  async getWorkFailclass(): Promise<any> {
    let eventItems: any = [];
    await this.queryOptselect().then((items) => {
      eventItems = items.filter((item: any) =>
        item.optselectno === 'sda_work.failclass')[0].options
        .map((item: any) => ({ value: item.value, label: item.label }));
    });
    return eventItems;
  }

  /** 获取维修的mtclass */
  async getmtclass(): Promise<any> {
    let eventItems: any = [];
    await this.queryOptselect().then((items) => {
      eventItems = items.filter((item: any) =>
        item.optselectno === 'sws_maintenance.mtclass')[0].options
        .map((item: any) => ({ value: item.value, label: item.label }));
    });
    return eventItems;
  }

  /** 下载图片文件 */
  @GET('/itsys/edoc_file/download.api?edocid=:id', { responseType: 'blob' })
  downloadFile(@Path('id') id: string): Observable<any> {
    return new Observable();
  }

  /** 下载文件 */
  @GET('/itsys/edoc_file/download.api?edocid=:id', { responseType: 'blob' })
  requestData(@Path('id') id: string): Observable<any> {
    return new Observable();
  }

  /** 显示历史上报的附件清单 */
  @POST('/itsys/edoc_document/querybyentity.api')
  querybyentity(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 获取页面配置 */
  @POST('/itsys/pageconfig/query.api')
  pageconfigQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }
  officePromise!: Observable<any>;
  /** 获取机构数据*/
  officeQuery(data: any): Observable<any> {
    if (this.officePromise) {
      return this.officePromise;
    } else {
      this.officePromise = this.http
        .post(
          environment.api_prefix + '/itsys/office/query.api',
          data
        )
        .pipe(share());
      return this.officePromise;
    }
  }
}
