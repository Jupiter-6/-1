import { Injectable } from '@angular/core';
import {
  BaseApi,
  BaseUrl,
  Headers,
  Payload,
  POST,
  _HttpClient,
} from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { format, subMonths } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class BiApiService {
  [key: string]: any;
  constructor(private http: _HttpClient) {}

  private sdabiQuery(
    params: Array<{ name: string; value1: any; value2?: any }>
  ) {
    return this.http
      .post(environment.api_prefix + '/sda/outdb/sdabi/query.api', {
        criteria: params,
      })
      .toPromise<any>()
      .then(({ items }) => {
        return items as any[];
      });
  }

  /** 经营指标 供水量 日报 */
  operation_gsl_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_ri' },
      { name: 'vdate', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 供水量 月报 */
  operation_gsl_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 供水量 年报 */
  operation_gsl_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_year' },
      { name: 'year', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 用电量 日报 */
  operation_ydl_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_ri' },
      { name: 'vdate', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 用电量 月报 */
  operation_ydl_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 用电量 年报 */
  operation_ydl_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_year' },
      { name: 'year', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 能耗 日报 */
  operation_power_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'ads_power_day' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 能耗 月报 */
  operation_power_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'ads_power_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 经营指标 能耗 年报 */
  operation_power_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'ads_power_year' },
      { name: 'year', value1: date[0], value2: date[1] },
    ]);
  }

  /** 生产指标 压力 日报 */
  production_yl_day(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_ri' },
      { name: 'vdate', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 压力 月报 */
  production_yl_month(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 压力 年报 */
  production_yl_year(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_year' },
      { name: 'year', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 浊度 日报 */
  production_zd_day(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_ri' },
      { name: 'vdate', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 浊度 月报 */
  production_zd_month(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 浊度 年报 */
  production_zd_year(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_year' },
      { name: 'year', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 余氯 日报 */
  production_yul_day(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_ri' },
      { name: 'vdate', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 余氯 月报 */
  production_yul_month(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 余氯 年报 */
  production_yul_year(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_year' },
      { name: 'year', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }

  /** 生产指标 PH 日报 */
  production_ph_day(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_ri' },
      { name: 'vdate', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 PH 月报 */
  production_ph_month(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }
  /** 生产指标 PH 年报 */
  production_ph_year(date: string[], factory: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'changzhou_year' },
      { name: 'year', value1: date[0], value2: date[1] },
      { name: 'factory', value1: factory },
    ]);
  }

  getValidMonth() {
    // 查询近一个月数据，如果为1号，则查询上个月的数据
    const isfirstDay = new Date().getDate() === 1;
    const date =
      (isfirstDay && format(new Date(), 'yyyyMM')) ||
      format(subMonths(new Date(), 1), 'yyyyMM');
    return date;
  }
  /** 营销指标 户表 标签 */
  marketing_hb_tags() {
    const date = this.getValidMonth();
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_xzyue' },
      { name: 'yue', value1: date, value2: date },
    ]);
  }
  /** 营销指标 户表 日报 */
  marketing_hb_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_xzri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 户表 月报 */
  marketing_hb_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_xzyue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 户表 年报 */
  marketing_hb_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_xzyear' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 水费 标签 */
  marketing_sf_tags() {
    const date = this.getValidMonth();
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date, value2: date },
    ]);
  }
  /** 营销指标 水费 日报 */
  marketing_sf_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_ri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 水费 月报 */
  marketing_sf_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 水费 年报 */
  marketing_sf_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_year' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 欠费 标签 */
  marketing_qf_tags() {
    const date = this.getValidMonth();
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date, value2: date },
    ]);
  }
  /** 营销指标 欠费 日报 */
  marketing_qf_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_ri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 欠费 月报 */
  marketing_qf_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 欠费 年报 */
  marketing_qf_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_year' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 抄表 标签 */
  marketing_cb_tags() {
    const date = this.getValidMonth();
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date, value2: date },
    ]);
  }
  /** 营销指标 抄表 日报 */
  marketing_cb_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_ri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 抄表 月报 */
  marketing_cb_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 抄表 年报 */
  marketing_cb_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_year' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 水量 标签 */
  marketing_sl_tags() {
    const date = this.getValidMonth();
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date, value2: date },
    ]);
  }
  /** 营销指标 水量 日报 */
  marketing_sl_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_ri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 水量 月报 */
  marketing_sl_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 营销指标 水量 年报 */
  marketing_sl_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_year' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 服务指标 话务 小时 */
  serve_hw_hour(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_rxxs' },
      { name: 'xs', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 话务 日报 */
  serve_hw_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_ri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 话务 月报 */
  serve_hw_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 话务 年报 */
  serve_hw_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_year' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 服务指标 工单 小时 */
  serve_gd_hour(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzlxs' },
      { name: 'xs', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 工单 日报 */
  serve_gd_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzl' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 工单 月报 */
  serve_gd_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzlyue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 工单 年报 */
  serve_gd_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzlyear' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 服务指标 服务 小时 */
  serve_fw_hour(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_rxxs' },
      { name: 'xs', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 服务 日报 */
  serve_fw_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_ri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 服务 月报 */
  serve_fw_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_yue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 服务 年报 */
  serve_fw_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_year' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 服务指标 分布 小时 */
  serve_fb_hour(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_rxqyxs' },
      { name: 'xs', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 分布 日报 */
  serve_fb_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_rxqy' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 分布 月报 */
  serve_fb_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_rxqyyue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 分布 年报 */
  serve_fb_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_rxqyyear' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 服务指标 类别 小时 */
  serve_lb_hour(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzlxs' },
      { name: 'xs', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 类别 日报 */
  serve_lb_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzl' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 类别 月报 */
  serve_lb_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzlyue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 服务指标 类别 年报 */
  serve_lb_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_gdzlyear' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 业务指标 业务 日报 */
  business_yw_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_bzywri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 业务指标 业务 月报 */
  business_yw_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_bzywyue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 业务指标 业务 年报 */
  business_yw_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_bzywyear' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 业务指标 工程 日报 */
  business_gc_day(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_bzywri' },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 业务指标 工程 月报 */
  business_gc_month(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_bzywyue' },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 业务指标 工程 年报 */
  business_gc_year(date: string[]) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'cz_bzywyear' },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 二供指标 巡检类型查询 */
  sws_class_query() {
    return this.http
      .post(environment.api_prefix + '/sws/class/query.api', {
        criteria: [
          { name: 'enabled', value1: 1 },
        ],
      })
      .toPromise()
      .then((data) => {
        return data.items as any[];
      });
  }
  /** 二供指标 任务 日报 */
  sws_task_day(date: string[], pdclassno: string) {
    return this.http
      .post(environment.api_prefix + '/sws/routetask/statisticstimetype.api', {
        criteria: [
          { name: 'date', value1: date[0], value2: date[1] },
          { name: 'pdclassno', value1: pdclassno },
          { name: 'timetype', value1: 'date' },
        ],
      })
      .toPromise()
      .then((data) => {
        return data.items as any[];
      });
  }
  /** 二供指标 任务 周报 */
  sws_task_week(date: string[], pdclassno: string) {
    return this.http
      .post(environment.api_prefix + '/sws/routetask/statisticsmonth.api', {
        criteria: [
          { name: 'month', value1: date[0] },
          { name: 'pdclassno', value1: pdclassno },
        ],
      })
      .toPromise()
      .then((data) => {
        return data.items as any[];
      });
  }
  /** 二供指标 任务 月报 */
  sws_task_month(date: string[], pdclassno: string) {
    return this.http
      .post(environment.api_prefix + '/sws/routetask/statisticstimetype.api', {
        criteria: [
          { name: 'date', value1: date[0], value2: date[1] },
          { name: 'pdclassno', value1: pdclassno },
          { name: 'timetype', value1: 'month' },
        ],
      })
      .toPromise()
      .then((data) => {
        return data.items as any[];
      });
  }
  /** 二供指标 任务 年报 */
  sws_task_year(date: string[], pdclassno: string) {
    return this.http
      .post(environment.api_prefix + '/sws/routetask/statisticstimetype.api', {
        criteria: [
          { name: 'date', value1: date[0], value2: date[1] },
          { name: 'pdclassno', value1: pdclassno },
          { name: 'timetype', value1: 'year' },
        ],
      })
      .toPromise()
      .then((data) => {
        return data.items as any[];
      });
  }

  /** 二供指标 水质 日报 */
  sws_shuizhi_day(date: string[], itemno: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'eg_sz' },
      { name: 'itemno', value1: itemno },
      { name: 'ri', value1: date[0], value2: date[1] },
    ]);
  }
  /** 二供指标 水质 月报 */
  sws_shuizhi_month(date: string[], itemno: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'eg_szyue' },
      { name: 'itemno', value1: itemno },
      { name: 'yue', value1: date[0], value2: date[1] },
    ]);
  }
  /** 二供指标 水质 年报 */
  sws_shuizhi_year(date: string[], itemno: string) {
    return this.sdabiQuery([
      { name: 'configno', value1: 'eg_szyear' },
      { name: 'itemno', value1: itemno },
      { name: 'year_', value1: date[0], value2: date[1] },
    ]);
  }

  /** 二供指标 总览 实时数据*/
  sws_zl_sssj() {
    return this.sdabiQuery([{ name: 'configno', value1: 'eg_last' }]);
  }
  /** 二供指标 总览 泵房分布*/
  sws_zl_bffb() {
    return this.sdabiQuery([
      { name: 'configno', value1: 'eg_dma' },
      { name: 'code', value1: 'bffb' },
    ]);
  }
  /** 二供指标 总览 供水模式*/
  sws_zl_gsms() {
    return this.sdabiQuery([
      { name: 'configno', value1: 'eg_dma' },
      { name: 'code', value1: 'gsms' },
    ]);
  }
}
