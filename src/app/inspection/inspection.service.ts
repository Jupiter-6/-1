import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Inspection, InspectionDetail, InspectionItem } from '@shared/entities/database.type';
import { InspectionParamMap, MediaData, MediaType, ResourceUrl } from '@shared/entities/inspection.type';
import { InspectionApiService } from '@shared/services/inspection-api.service';
import { DatabaseService } from '@shared/services/_database.service';
import { from, Subject } from 'rxjs';
import * as JSZip from 'jszip';
import { ZipService } from '@delon/abc/zip';
import { MessageService } from '@shared/components/message/message.service';
import { deepCopy } from '@delon/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  public uploadSucess = new Subject<Inspection>();
  private Tasks: { [key: string]: Inspection } = {};
  private media: MediaData = { photo: {}, video: {}, audio: {}, exception: {} }

  constructor(
    private databaseService: DatabaseService,
    private inspectionApiService: InspectionApiService,
    private zip: ZipService,
    private message: MessageService,
    private router: Router
  ) { }

  /** 获取项目id */
  private getIds(houseid: string[], detail: InspectionDetail) {
    const deviceMap = {} as { [key: string]: boolean };
    detail?.devices.map(i => {
      if (houseid.includes(i.routetask_house_id)) {
        deviceMap[i.id] = true;
      }
    })
    const itemids = detail?.items.filter(i => deviceMap[i.routetask_device_id]).map(i => {
      return i.id;
    }) || [];
    return itemids;
  }
  /** 读取 */
  public read(type: MediaType, paramMap: InspectionParamMap): Array<ResourceUrl> {
    const { taskid, houseid, projectid } = paramMap;
    if (projectid) {
      return this.media[type][projectid] || [];
    }
    if (!taskid) { return [] };
    const { detail } = this.databaseService.read<Inspection>('inspection')[taskid];
    if (houseid) {
      const itemids = this.getIds([houseid], detail!);
      const arr = itemids.map(i => this.media[type][i] || []);
      return arr.reduce((a, b) => a.concat(b));
    }
    if (taskid) {
      const itemids = this.getIds(detail!.houses.map(i => i.id), detail!);
      const arr = itemids.map(i => this.media[type][i] || []);
      return arr.reduce((a, b) => a.concat(b));
    }
    return [];
  }
  /** 新增 */
  public set(type: MediaType, data: { id: string, url: string | SafeResourceUrl, name: string }): boolean {
    const { id, url, name } = data;
    if (!id || !url) { return false; }
    const source = this.media[type][id];
    if (!source) {
      this.media[type][id] = [];
    }
    this.media[type][id].unshift({ url, remark: '', name }); // 增加
    return true;
  }
  /** 删除 */
  public del(type: MediaType, data: ResourceUrl): boolean {
    const source = Object.values(this.media[type]);
    for (const item of source) {
      const index = item.findIndex(i => i === data);
      if (index !== -1) {
        item.splice(index, 1);
        break;
      }
    }
    return true;
  }


  /** 创建JSON二进制文件，并返回url */
  createJsonBlobUrl(item: InspectionItem, task: Inspection,
    media: { photos: ResourceUrl[]; audios: ResourceUrl[]; videos: ResourceUrl[]; }): string {
    const medias: ResourceUrl[] = [...media.photos, ...media.audios, ...media.videos];
    const edocRemarks: { [key: string]: string } = {};
    medias.map((i) => { i.remark && i.name && (edocRemarks[i.name] = i.remark) });
    const jsonObj = {
      id: item.id,                // 对应routetask_item.id
      orgid: task.orgid,          // 组织单元id
      routetaskid: task.routeid,  // 路线任务id
      itemno: item.itemno,        // 项目编码
      value1: item.value1,      	// 采集值1
      value2: item.value2,      	// 采集值2
      value3: item.value3,	      // 采集值3
      value4: item.value4,	      // 采集值4
      value5: item.value5,	      // 采集值5
      valuetext: item.valuetext,	// 值文本显示
      remark: item.remark,	      // 现场备注
      photos: media.photos.length, // 拍照附件数量
      videos: media.videos.length, // 视频附件数量
      audios: media.audios.length, // 音频附件数量
      entertime: item.entertime,	 // 采集时间, 格式 yyyy-MM-dd HH:mm:ss
      edocRemarks,
      abandoned: item.status == 9 ? 1 : 0,
    };
    const blob = new Blob([JSON.stringify(jsonObj)], {
      type: 'application/json',
    })
    return URL.createObjectURL(blob);
  }
  uploadIterator(items: InspectionItem[], task: Inspection, index: number = 0) {
    const item = items[index];            // 原始数据；
    const promises: Promise<void>[] = []; // 数据集合；
    const photos = this.read('photo', { projectid: item.id } as InspectionParamMap);
    const audios = this.read('audio', { projectid: item.id } as InspectionParamMap);
    const videos = this.read('video', { projectid: item.id } as InspectionParamMap);

    this.zip.create().then((zip: JSZip) => {
      const url = this.createJsonBlobUrl(item, task, { photos, audios, videos });
      promises.push(this.zip.pushUrl(zip, `routetaskitem/routetask_item.json`, url)); // 压缩 json
      photos.map((i: any) => { promises.push(this.zip.pushUrl(zip, `routetaskitem/photo/${i.name}`, i.url.changingThisBreaksApplicationSecurity)); });
      videos.map((i) => { promises.push(this.zip.pushUrl(zip, `routetaskitem/video/${i.name}`, i.url as string)); });
      audios.map((i) => { promises.push(this.zip.pushUrl(zip, `routetaskitem/audio/${i.name}`, i.url as string)); });
      /** 如果有异常上报信息 */
      if (item.event) {
        const exceptions = this.read('exception', { projectid: item.id } as InspectionParamMap);
        const blob = new Blob([JSON.stringify(item.event)], { type: 'application/json' })
        const eventUrl = URL.createObjectURL(blob);
        promises.push(this.zip.pushUrl(zip, `abnormalevent/AppEventVO.json`, eventUrl)); // 压缩 json
        exceptions.map((i: any) => { promises.push(this.zip.pushUrl(zip, `abnormalevent/photo/${i.name}`, i.url.changingThisBreaksApplicationSecurity)); });
      }
      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then((zipBlob) => {
          const formData = new FormData();
          const filename = `${task.orgid}_${item.id}.zip`;
          formData.append('file', zipBlob, filename);

          this.inspectionApiService.upload(formData).subscribe((data) => { afterUpload(); }) // 生产环境逻辑
          // this.zip.save(zip, { filename }).then(() => { console.log('下载成功'); }) // 测试环境逻辑 - 1
          // setTimeout(() => { afterUpload(); }, 1000); // 测试环境逻辑 - 2

          //** 上传成功后的逻辑 */
          const afterUpload = () => {
            item.status = 2;
            item.uploadtime = new Date().getTime();

            const nextIndex = index + 1;
            const unfinished = nextIndex <= items.length - 1;
            if (unfinished) {
              this.uploadIterator(items, task, index + 1); // 继续递归
              this.updateData(task);
            } else {
              task.loading = false;
              /** 判断是否已完成所有项目 */
              if (task.detail) {
                let itemdones = task.detail.houses.map(i => i.itemdone);
                const sum = itemdones.reduce((partialSum, a) => partialSum + a, 0);
                sum === task.itemcount && (task.status = 5);
              }
              this.updateData(task);
              this.message.show({
                type: 'success',
                content: `${task.name}上传成功！`
              })
            }
          }
        })
      })
    });
  }

  updateData(task: Inspection) {
    this.databaseService.set('inspection', task);
    this.uploadSucess.next(task); // 发出事件
  }

  /** 上传 */
  upload(item: Inspection) {
    item.loading = true;
    const task = deepCopy(item);
    this.Tasks[task.id] = task;
    /** 找到已完成的项目（还没有上传的） */
    const projects = task.detail?.items.filter(i => {
      return (i.status === 1) || (i.status === 9) && !i.uploadtime;
    }) || [];
    if (!projects.length) {
      this.message.show({
        type: 'warning',
        content: `没有待上传项目`
      })
      item.loading = false;
      return false;
    }
    this.uploadIterator(projects, task);
    return true;
  }



  /** 读取二维码导航 */
  readQRcode(code: string, task: Inspection): boolean {
    if (code.startsWith('sws_H_')) {
      const house = task.detail?.houses.find(i => code.indexOf(i.house_houseno) !== -1);
      if (house) {
        this.router.navigate([`/inspection/pump-house/${task.id}/${house.id}`]);
      } else {
        this.message.show({
          type: 'info',
          content: `该项目下没有此泵房信息`
        })
      }
      return true;
    }
    if (code.startsWith('sws_D_')) {
      const device = task.detail?.devices.find(i => code.indexOf(i.device_deviceno) !== -1);
      if (device) {
        this.router.navigate([`/inspection/pump-house/${task.id}/${device.routetask_house_id}/${device.id}`]);
      } else {
        this.message.show({
          type: 'info',
          content: `该项目下没有此设备信息`
        })
      }
      return true;
    }
    this.message.show({
      type: 'info',
      content: `二维码结果无法识别`
    })
    return false;
  }
}
