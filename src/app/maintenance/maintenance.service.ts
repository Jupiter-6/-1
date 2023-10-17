import { Injectable } from '@angular/core';
import { DatabaseService } from '@shared/services/_database.service';
import { Maintenance } from '@shared/entities/database.type';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { getFields, getQueryFields } from './maintenance.config';
import { MaintenanceApiService } from '@shared/services/maintenance-api.service';
import { ZipService } from '@delon/abc/zip';
import * as JSZip from 'jszip';
import { MessageService } from '@shared/components/message/message.service';
import { format } from 'date-fns';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  EventMap: any = {
    EVENT: '事件',
    MANU: '手工'
  };

  /** id-多媒体数据 */
  itemid_edocs_map: any = {};

  /** id-任务详情 */
  id_itemdetil_map: any = {};

  /** id-item表单,缓存维修历史查看详情时的表单数据 */
  itemid_form_map: any = {};

  /** 泵房列表 */
  houseItems: any[] = [];


  database: { [key: string]: Maintenance } = {};

  constructor(
    private databaseService: DatabaseService,
    private itsysApiService: ItsysApiService,
    private apiService: MaintenanceApiService,
    private zip: ZipService,
    private domSanitizer: DomSanitizer,
    private messageService: MessageService,
  ) { }

  /** 初始化表单 */
  initFields(pagestatus: string, item: any, model?: any): FormlyFieldConfig[] {
    const fields = getFields(pagestatus, item, this.itsysApiService, model);
    return fields;
  }

  /** 获取维修任务详情 */
  getItem(id: string): any {
    let result = {};
    if (this.id_itemdetil_map[id]) {
      result = this.id_itemdetil_map[id];
    } else {
      result = this.databaseService.read<Maintenance>('maintenance')[id];
    }
    return result;
  }

  /** 读取所有表单 */
  getAlldata(): any {
    return this.databaseService.read<Maintenance>('maintenance');
  }

  /** 通过id读取表单 */
  getDataById(id: string): any {
    let result: any;
    if (this.itemid_form_map[id]) {
      result = this.itemid_form_map[id];
    } else {
      result = this.databaseService.read<Maintenance>('maintenance')[id];
      this.itemid_form_map[id] = result;
    }
    return result;
  }

  /** 上传 */
  async upload(item: any): Promise<any> {
    let result = {};
    const dirName = this.databaseService.user.orgid + '_' + item.id;
    const zipName = dirName + '.zip';
    const promises: Promise<void>[] = [];
    await this.zip.create().then(async (zip: JSZip) => {
      const url = this.createJsonBlobUrl(item);
      promises.push(this.zip.pushUrl(zip, 'maintenance.json', url));
      item.photos.map((i: any) => {
        promises.push(this.zip.pushUrl(zip, `photo/${i.name}`, i.url.changingThisBreaksApplicationSecurity));
      });
      item.videos.map((i: any) => {
        promises.push(this.zip.pushUrl(zip, `video/${i.name}`, i.url as string));
      });
      item.audios.map((i: any) => {
        promises.push(this.zip.pushUrl(zip, `audio/${i.name}`, i.url as string));
      });
      await Promise.all(promises).then(async () => {
        await zip.generateAsync({ type: 'blob' }).then(async (zipBlob) => {
          const formData = new FormData();
          const filename = zipName;
          formData.append('file', zipBlob, filename);
          await this.apiService.uploadZip(formData).toPromise().then((res: any) => {
            result = res;
            // 上传成功后从数据库中删除
            if (result === true) {
              this.databaseService.del('maintenance', item.id);
            }
            // this.zip.save(zip, {filename});
          });
        });
      });
    });
    return result;
  }

  createJsonBlobUrl(item: any): string {
    const edocMap: any = {};
    item.photos.forEach((i: any) => { edocMap[i.name] = i.remark; });
    item.videos.forEach((i: any) => { edocMap[i.name] = i.remark; });
    item.audios.forEach((i: any) => { edocMap[i.name] = i.remark; });
    // const obj = Object.create(null);
    // for (const [k, v] of edocMap) {
    //   obj[k] = v;
    // }
    const json = {
      id: item.id, // 对应maintenance.id
      orgid: this.databaseService.user.orgid, // 组织单元id
      pareaid: item.model.pareaid,
      deviceid: item.model.deviceid,
      mtclass: item.mtclass,
      failclass: item.model.failclass,
      cutoff: item.model.cutoff,
      offbgntime: new Date(item.model.offbgntime).getTime(),
      offendtime: new Date(item.model.offendtime).getTime(),
      cutoffhour1: item.cutoffhour1,
      cutoffhour2: item.cutoffhour2,
      phenomenon: item.model.phenomenon,
      analyse: item.model.analyse,
      solution: item.model.solution,
      summary: item.model.summary,
      bgntime: new Date(item.model.bgntime).getTime(),
      endtime: new Date(item.model.endtime).getTime(),
      labors: item.model.labors,
      hours: Math.round((item.model.endtime - item.model.bgntime) / 1000 / 60 / 60),
      workcompany: item.model.workcompany,
      workmans: item.model.workmans,
      worksigndate: new Date(item.model.worksigndate).getTime(),
      enteruser: this.databaseService.user.id,
      scanenter: item.scanenter,
      scanexit: item.scanexit,
      photos: item.photos.length, // 拍照附件数量
      videos: item.videos.length,	// 视频附件数量
      audios: item.audios.length,	// 音频附件数量
      entertime: new Date(item.model.entertime).getTime(),	// 采集时间, 格式yyyy- MM - dd HH: mm: ss
      parts: item.parts,
      // edocRemarks: obj
      edocRemarks: edocMap
    };
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }

  /** 取消下载任务 */
  canceldownload(params: any): void {
    this.apiService.canceldownload(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      }
    });
  }

  /** 查询维修历史 */
  async queryHisList(params: any): Promise<any> {
    let result: any = [];
    await this.apiService.maintenanceHistory(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      result = res.items?.map((item: any) => ({
        ...item,
        itemdate: item.entertime,
        itemtime: item.entertime,
        photonum: item.photos || 0,
        audionum: item.audios || 0,
        videonum: item.videos || 0,
        partnum: item.partcount || 0,
        type: item.mtclass,
        code: item.maintenanceno,
        name: (item.vo?.house_name || '') + (item.vo?.parea_name || '') + (item.vo?.device_name || ''),
        detail: item.phenomenon,
        conclusion: item.summary,
        source: this.EventMap[item.mtsource],
        bgntime: item.bgntime ? new Date(item.bgntime) : null,
        endtime: item.endtime ? new Date(item.endtime) : null,
        worksigndate: item.worksigndate ? new Date(item.worksigndate) : null,
        offbgntime: item.offbgntime ? new Date(item.offbgntime) : null,
        offendtime: item.offendtime ? new Date(item.offendtime) : null,
      }));
    });
    return result;
  }

  /** 查询多媒体信息 */
  async queryEdoc(itemid: string): Promise<any> {
    let result: any;
    if (this.itemid_edocs_map[itemid]) {
      result = this.itemid_edocs_map[itemid];
    } else {
      const params = {
        criteria: [{
          name: 'maintenanceid',
          value1: itemid
        }]
      };
      await this.apiService.maintenance_edoc_query(params).toPromise().then((res) => {
        if (res.code !== '0') {
          this.messageService.show({ content: '错误', type: 'danger' });
          return;
        }
        result = res.items;
        // 缓存该itemid对应的所有多媒体数据
        this.itemid_edocs_map[itemid] = result;
      });
    }
    return result;
  }

  /** 获取音频的edocid */
  async getAudioList(itemid: string): Promise<Array<any>> {
    let audioList: Array<any> = [];
    await this.queryEdoc(itemid).then((list) => {
      audioList = list.filter((i: any) => i.edoctype === 'A');
    });
    return audioList;
  }

  /** 获取图片的edocid */
  async getPhotoList(itemid: string): Promise<Array<any>> {
    let photoList: Array<any> = [];
    await this.queryEdoc(itemid).then((list) => {
      photoList = list.filter((i: any) => i.edoctype === 'P');
    });
    return photoList;
  }

  /** 获取视频的edocid */
  async getVideoList(itemid: string): Promise<Array<any>> {
    let videoList: Array<any> = [];
    await this.queryEdoc(itemid).then((list) => {
      videoList = list.filter((i: any) => i.edoctype === 'V');
    });
    return videoList;
  }

  /** 获取文件url */
  async getUrl(id: string): Promise<any> {
    let url;
    await this.itsysApiService.requestData(id).toPromise().then((response: any) => {
      const blob = new Blob([response]);
      url = URL.createObjectURL(blob);
    });
    return url;
  }

  /** 获取文件url */
  async getPhotoUrl(id: string): Promise<any> {
    let url: SafeUrl = '';
    await this.itsysApiService.downloadFile(id).toPromise().then((response: any) => {
      const blob1 = new Blob([response]);
      const tmp = URL.createObjectURL(blob1);
      url = this.domSanitizer.bypassSecurityTrustUrl(tmp);
    });

    return url;
  }

  /** 查询配件 */
  async getPart(params: any): Promise<Array<any>> {
    let result: Array<any> = [];
    await this.apiService.maintenance_part_query(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      result = res.items;
    });
    return result;
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

  /** 获取查询模态框的表单 */
  getQueryFields(): any {
    const fields = getQueryFields(this, this.itsysApiService);
    return fields;
  }

}
