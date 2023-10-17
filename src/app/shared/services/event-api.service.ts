import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, Headers, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class EventApiService extends BaseApi {

  /** 厂站id_name对应 */
  factoryid_name_map: any = {};

  constructor(
    protected injector: Injector,
    private http: _HttpClient,
  ) {
    super(injector);
  }

  /** 查询我的上报 */
  @POST('/sda/events/query.api')
  appquery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询厂站 */
  @POST('/sda/factory/query.api')
  queryFactory(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询测站 */
  @POST('/sda/station/query.api')
  queryStation(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 获取所有厂站 */
  async getFactory(): Promise<any> {
    if (Object.keys(this.factoryid_name_map).length > 0) {
      return this.factoryid_name_map;
    } else {
      await Promise.all([
        this.queryFactory({}).toPromise(),
        this.queryStation({}).toPromise()
      ]).then(([facRes, staRes]) => {
        if (facRes.code === '0' || staRes.code === '0') {
          facRes.items.forEach((item: any) => {
            this.factoryid_name_map[item.id] = item.name;
          });
          staRes.items.forEach((item: any) => {
            this.factoryid_name_map[item.id] = item.name;
          });
        }
      })
      return this.factoryid_name_map;
    }
  }

  /** 分区列表查询 */
  @POST('/sda/dma/query.api')
  queryDma(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 创建事件 */
  @POST('/sda/events/create.api')
  createEvents(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 创建事件 */
  @POST('/sda/events/insert.api')
  insertEvents(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 上传应急事件zip */
  uploadZip(data: FormData): any {
    return this.http.post(environment.api_prefix + '/sda/app_work/uploadzip.api', data);
  }

}
