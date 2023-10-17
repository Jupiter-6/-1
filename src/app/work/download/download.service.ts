import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { WorkApiService } from '@shared/services/work-api.service';
import { Work } from '@shared/entities/database.type';
import { DatabaseService } from '@shared/services/_database.service';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  /** 维修来源 */
  EventMap: any = {
    EVENT: '事件',
    MANU: '手工'
  };

  constructor(
    private apiService: WorkApiService,
    private messageService: MessageService,
    private databaseService: DatabaseService,
  ) { }

  /** 任务列表获取 */
  async getMaintenanceList(params: any): Promise<any> {
    let result: any = [];
    await this.apiService.query_fordown(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items?.forEach((item: any) => {
        // 读取数据库
        const tmpdata = this.databaseService.read<Work>('work')[item.id];
        if (!!tmpdata) {
          // 0：未下载，1：下载中，2：已完成
          item.download_status = 2;
        } else {
          item.download_status = 0;
        }
        item.housename = (item.house_name || '') + (item.parea_name || '') + (item.device_name || '');
        item.mtsourceStr = this.EventMap[item.mtsource];
        if (item.pubtime) { 
          item.pubtimeStr = format(item.pubtime, 'yyyy-MM-dd HH:mm:ss');
        }
      });
      result = res.items || [];
    });
    return result;
  }

  /** 下载维修任务 */
  async download(params: any, item: any): Promise<any> {
    let result = false;
    await this.apiService.download(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      const maintenance = {
        ...item,
        downloadtime: new Date().getTime(),
        pareas: res.item.pareas,
        devices: res.item.devices,
        workcompanys: res.item.workcompanys,
        download_status: 2,
        parts: [],
        photos: [],
        videos: [],
        audios: [],
      };
      this.databaseService.set('work', maintenance);
      result = true;
    });
    return result;
  }

}
