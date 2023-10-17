import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { EventApiService } from '@shared/services/event-api.service';
import { format } from 'date-fns';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DatabaseService } from '@shared/services/_database.service';
import { Breakdown } from '@shared/entities/database.type';
import { ZipService } from '@delon/abc/zip';
import * as JSZip from 'jszip';
import { promise } from 'protractor';
import { getFields } from './event.config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  /** 当前选中的事件 */
  curItem: any = null;

  /** 分区列表 */
  dmaItems: any[] = [];

  dmaid_item_map: any = {};

  facMap: any = [];
  staMap: any = [];

  /** 图片缓存 */
  picid_url_map: any = {};

  constructor(
    private apiService: EventApiService,
    private messageService: MessageService,
    private itsysApiService: ItsysApiService,
    private domSanitizer: DomSanitizer,
    private databaseService: DatabaseService,
    private zip: ZipService,
  ) { }

  /** 查询我的上报 */
  async appquery(params: any): Promise<any> {
    const data: any = [];
    await this.apiService.appquery(params).toPromise().then(async (res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items?.sort((a: any, b: any) => {
        return b.createtime - a.createtime;
      });
      await Promise.all([
        this.apiService.getFactory(),
        this.getDmaList()
      ]).then(([facmap, dmamap]) => {
        res.items?.forEach((item: any) => {
          const tmp = {
            ...item,
            id: item.id,
            itemdate: format(item.createtime, 'yyyy-MM-dd'),
            itemtime: format(item.createtime, 'HH:mm'),
            content: item.option_eventcls_label,
            level: item.eventlevel + '级',
            name: ''
          };
          if (item.factoryid) {
            tmp.name = `${this.dmaid_item_map[item.dmaid].name}-${facmap[item.factoryid] || ''}`;
          } else {
            tmp.name = this.dmaid_item_map[item.dmaid].name;
          }
          data.push(tmp);
        });
      });
      // await this.apiService.getFactory().then((map) => {
      //   res.items?.forEach((item: any) => {
      //     const tmp = {
      //       ...item,
      //       id: item.id,
      //       itemdate: format(item.createtime, 'yyyy-MM-dd'),
      //       itemtime: format(item.createtime, 'HH:mm'),
      //       content: item.option_eventcls_label,
      //       level: item.eventlevel + '级',
      //       name: ''
      //     };
      //     if (item.factoryid) {
      //       tmp.name = `${item.dmanodes}-${map[item.factoryid]}`;
      //     } else {
      //       tmp.name = item.dmanodes;
      //     }
      //     data.push(tmp);
      //   });
      // });
    });
    return data;
  }

  /** 获取分区列表 */
  async getDmaList(): Promise<any> {
    if (this.dmaItems.length === 0) {
      await this.apiService.queryDma({}).toPromise().then((res) => {
        if (res.code !== '0') {
          this.messageService.show({ content: '错误', type: 'danger' });
          return;
        }
        res.items.forEach((item: any) => {
          this.dmaItems.push({ value: item.id, label: item.name });
          this.dmaid_item_map[item.id] = item;
        });
        // this.dmaItems = res.items.map((item: any) => ({ value: item.id, label: item.name }));
      });
      this.dmaItems.sort((a, b) => {
        return a.label.localeCompare(b.label, 'zh-CN');
      });
    }
    return this.dmaItems;
  }

  /** 根据dma查询站点列表 */
  async getFactoryList(id: string): Promise<any> {
    let list: any = [];
    const params = {
      criteria: [{
        name: 'dmanodeid',
        value1: id || ''
      }]
    };
    await Promise.all([
      this.apiService.queryFactory(params).toPromise(),
      this.apiService.queryStation(params).toPromise()
    ]).then(([facRes, staRes]) => {
      if (facRes.code !== '0' || staRes.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      const faclist: any = [];
      facRes.items.forEach((item: any) => {
        this.facMap[item.id] = item.name;
        faclist.push({ value: item.id, label: item.name });
      });
      const stalist: any = [];
      staRes.items.forEach((item: any) => {
        this.staMap[item.id] = item.name;
        stalist.push({ value: item.id, label: item.name });
      });
      list = [...faclist, ...stalist];
    });
    // await this.apiService.queryFactory(params).toPromise().then((res) => {
    //   if (res.code !== '0') {
    //     this.messageService.show({ content: '错误', type: 'danger' });
    //     return;
    //   }
    //   list = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    // });
    list.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return list;
  }

  /** 新建事件 */
  async create(): Promise<any> {
    let item: any;
    await this.apiService.createEvents({}).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      item = res.item;
    });
    return item;
  }

  /** 初始化表单 */
  initFields(pagestatus: string, model?: any): FormlyFieldConfig[] {
    const fields = getFields(pagestatus, this, this.itsysApiService, model);
    return fields;
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

  /** 上传 */
  async upload(item: any, piclist: any): Promise<any> {
    let result = {};
    const promises: Promise<void>[] = [];
    await this.zip.create().then(async (zip: JSZip) => {
      const url = this.createJsonBlobUrl(item);
      promises.push(this.zip.pushUrl(zip, 'event.json', url));
      piclist.map((i: any) => {
        promises.push(this.zip.pushUrl(zip, `photo/${i.name}`, i.url.changingThisBreaksApplicationSecurity));
      });
      await Promise.all(promises).then(async () => {
        await zip.generateAsync({ type: 'blob' }).then(async (zipBlob) => {
          const formData = new FormData();
          const filename = `event.zip`;
          formData.append('file', zipBlob, filename);
          await this.apiService.uploadZip(formData).toPromise().then((res: any) => {
            result = res;
            // this.zip.save(zip, {filename});
          });
        });
      });
    });
    return result;
  }

  createJsonBlobUrl(item: any): string {
    const json = {
      ...item,
      person: this.databaseService.user.id,
      orgid: this.databaseService.user.orgid,
      eventsource: 1,
      status: 0,
    };
    console.log(json);
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }


}
