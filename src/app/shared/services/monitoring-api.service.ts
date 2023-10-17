import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, Payload, POST } from '@delon/theme';
import { environment } from '@env/environment';
import { HouseCoordinateEntity } from '@shared/entities/monitoring.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix + '/sws')
export class MonitoringApiService extends BaseApi {
  /** 泵房列表查询 */
  @POST('/house/query.api')
  queryHouse(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /*
   * 查询按营业所、
   * 增压区统计的泵站数量
   */
  @POST('/parea/countByDmaAndBoost.api')
  countByDmaAndBoost(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /*
   * 按泵站名称查询泵站信息、
   * 查询营业所下属泵站信息（包含进水流量、压力等传感器）、
   * 查询关注的泵站信息（包含进水流量、压力等传感器） myfavorite	我的收藏夹=1
   */
  @POST('/parea/queryformonitor.api')
  queryformonitor(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询水箱容量的数据 */
  @POST('/tank/query.api')
  queryTank(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询泵房和泵区的信息 */
  @POST('/house/readHouseAndPareas.api')
  readHouseAndPareas(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询子项目 */
  @POST('/itemtask/query.api')
  itemtaskQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询所有泵房任务 */
  @POST('/housetask/query.api')
  housetaskQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询水质详检信息 */
  @POST('/formrow/querywithdata.api')
  formrowQuerywithdata(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询维修历史信息 */
  @POST('/maintenance/query.api')
  maintenanceQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 根据泵房id读取泵房实体 */
  @POST('/house/read.api')
  houseRead(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 获取泵房下面的泵组列表 */
  @POST('/parea/query.api')
  pareaQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }
  center: number[] = []; // 坐标中心
  private houses: HouseCoordinateEntity[] = [];
  public setHouses(houses: HouseCoordinateEntity[]) {
    this.houses = houses;
  }
  public gethouses(): HouseCoordinateEntity[] {
    return this.houses
  }
  /** 查询所有泵房的经纬度,经纬度为空的泵房不显示 */
  @POST('/house/queryformonitor.api')
  houseQueryformonitor(@Payload data: any): Observable<{
    code: string;
    items: Array<HouseCoordinateEntity>
  }> {
    return new Observable();
  }

  /** 泵区最新值 */
  @POST('/parea/querylastvalues.api')
  queryPareaLastvalues(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 泵房最新值 */
  @POST('/house/querylastvalues.api')
  queryHouseLastvalues(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 查询ids对应的sensorlinks */
  @POST('/link/queryByparea.api')
  queryByparea(@Payload data: any): Observable<any> {
    return new Observable();
  }


}
