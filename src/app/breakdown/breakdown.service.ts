import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { BreakdownApiService } from '@shared/services/breakdown-api.service';
import { format } from 'date-fns';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DatabaseService } from '@shared/services/_database.service';
import { Breakdown } from '@shared/entities/database.type';
import { ZipService } from '@delon/abc/zip';
import * as JSZip from 'jszip';
import { getFields } from './breakdown.config';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {

  /** 泵房列表 */
  houseItems: any[] = [];

  /** 异常类型列表 */
  eventItems: any[] = [];

  /** 图片缓存 */
  picid_url_map: any = {};

  constructor(
    private apiService: BreakdownApiService,
    private messageService: MessageService,
    private itsysApiService: ItsysApiService,
    private domSanitizer: DomSanitizer,
    private databaseService: DatabaseService,
    private zip: ZipService,
  ) { }

  /** 查询我的上报 */
  async appquery(params: any): Promise<any> {
    const data: any = [];
    await this.apiService.appquery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items?.sort((a: any, b: any) => {
        return b.createtime - a.createtime;
      });
      res.items?.forEach((item: any) => {
        const tmp = {
          id: item.id,
          itemdate: format(item.createtime, 'yyyy-MM-dd'),
          itemtime: format(item.createtime, 'HH:mm'),
          housename: item.house_name,
          type: item.option_eventcls_label,
          level: item.eventlevel + '级'
        };
        data.push(tmp);
      });
    });
    return data;
  }

  /** 查询异常事件 */
  async getEvent(params: any): Promise<any> {
    let result: any = {};
    // // 读取数据库
    // const tmpdata = this.databaseService.read<Breakdown>('breakdown')[params.item.id];
    // if (!!tmpdata) {
    //   result = tmpdata;
    // } else {
    await this.apiService.appread(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      result = {
        id: res.item.id,
        houseid: res.item.houseid, // 泵房
        pareaid: res.item.pareaid || '', // 泵区
        deviceid: res.item.deviceid || '', // 设备
        eventcls: res.item.eventcls || '', // 异常类型
        eventlevel: res.item.eventlevel ? String(res.item.eventlevel) : '', // 事件等级
        eventtext: res.item.eventtext, // 事件内容(现场情况描述)}
      };
      // // 存入数据库
      // this.databaseService.set('breakdown', result);
    });
    // }
    return result;
  }

  /** 获取文件url */
  async getUrl(id: string): Promise<any> {
    let url: SafeUrl = '';
    if (this.picid_url_map[id]) {
      url = this.picid_url_map[id];
    } else {
      await this.itsysApiService.downloadFile(id).toPromise().then((response: any) => {
        const blob1 = new Blob([response]);
        const tmp = URL.createObjectURL(blob1);
        url = this.domSanitizer.bypassSecurityTrustUrl(tmp);
        // 缓存图片
        this.picid_url_map[id] = url;
      });
    }
    return url;
  }

  /** 获取泵房列表 */
  async getHouseList(): Promise<any> {
    if (this.houseItems.length === 0) {
      await this.apiService.queryHouse({}).toPromise().then((res) => {
        if (res.code !== '0') {
          this.messageService.show({ content: '错误', type: 'danger' });
          return;
        }
        this.houseItems = res.items.map((item: any) => ({ value: item.id, label: item.name }));
      });
      this.houseItems.sort((a, b) => {
        return a.label.localeCompare(b.label, 'zh-CN');
      });
    }
    return this.houseItems;
  }

  /** 根据houseid查询泵区列表 */
  async getPareaList(houseid: string): Promise<any> {
    let pareaList: any = [];
    const params = {
      criteria: [{
        name: 'houseid',
        value1: houseid
      }]
    };
    await this.apiService.pareaQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      pareaList = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    });
    pareaList.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return pareaList;
  }

  /** 根据pareaid查询设备列表 */
  async getDeviceList(pareaid: string): Promise<any> {
    let deviceList: any = [];
    const params = {
      criteria: [{
        name: 'pareaid',
        value1: pareaid
      }]
    };
    await this.apiService.deviceQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      deviceList = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    });
    deviceList.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return deviceList;
  }


  /** 根据itemid查询图片的edocid */
  async querybyentity(params: any): Promise<any> {
    let result: any = [];
    await this.itsysApiService.querybyentity(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      result = res.items;
    });
    return result;
  }

  /** 上传 */
  async upload(item: any, piclist: any): Promise<any> {
    const promises: Promise<void>[] = [];
    const zip: JSZip = await this.zip.create()
    const url = this.createJsonBlobUrl(item);
    promises.push(this.zip.pushUrl(zip, 'event.json', url));
    piclist.map((i: any) => {
      promises.push(this.zip.pushUrl(zip, `photo/${i.name}`, i.url.changingThisBreaksApplicationSecurity));
    });
    const r = await Promise.all(promises);
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const formData = new FormData();
    const filename = `event.zip`;
    formData.append('file', zipBlob, filename);
    const res = await this.apiService.uploadZip(formData).toPromise();
    return res;
  }

  createJsonBlobUrl(item: any): string {
    const json = {
      ...item,
      person: this.databaseService.user.id,
      orgid: this.databaseService.user.orgid,
      eventsource: 1,
      status: 0,
    };
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }

  /** 初始化表单 */
  initFields(pagestatus: string, model?: any): FormlyFieldConfig[] {
    const fields = getFields(pagestatus, this, this.itsysApiService, model);
    return fields;
  }

}
