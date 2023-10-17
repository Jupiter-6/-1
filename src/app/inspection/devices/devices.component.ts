import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inspection, InspectionDevice, InspectionHouse, InspectionItem } from '@shared/entities/database.type';
import { InspectionParamMap } from '@shared/entities/inspection.type';
import { DatabaseService } from '@shared/services/_database.service';
import { InspectionService } from '../inspection.service';

@Component({
  selector: 'im-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  /** 页面数据 */
  item = {} as Inspection;
  house = {} as InspectionHouse;
  /** 设备列表 */
  devices: InspectionDevice[] = []
  /** 项目列表 */
  projects: InspectionItem[] = [];
  showWebcam: boolean = false;
  media = { photos: 0, audios: 0, videos: 0 };
  constructor(
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private inspectionService: InspectionService
  ) { }
  startCamera() {
    // this.showWebcam = true;
    if ((window as any)?.javaobj) {
      (window as any)?.javaobj?.myscan();
      (window as any).passParam = (res: any) => {
        this.onSeclected(res);
      };
    }
  }
  onSeclected(code: string) {
    this.inspectionService.readQRcode(code, this.item);
  }
  ngOnInit(): void {
    const taskid = this.activatedRoute.snapshot.paramMap.get('taskid');
    const houseid = this.activatedRoute.snapshot.paramMap.get('houseid');
    if (taskid && houseid) {
      this.item = this.readDatabase(taskid);
      this.house = (this.item.detail?.houses || []).find(i => i.id === houseid) || {} as InspectionHouse;
      /** 过滤当前泵房下的所有设备 */
      const devicesMap: { [key: string]: InspectionDevice } = {};
      this.devices = this.item.detail?.devices.filter(i => {
        const isvalid = i.routetask_house_id === houseid;
        if (isvalid) { devicesMap[i.id] = i };
        return isvalid;
      }) || [];
      /** 过滤当前泵房下所有设备下的所有项目 */
      for (const item of this.item.detail?.items || []) {
        if (devicesMap[item.routetask_device_id]) {
          this.projects.push(item);
        }
      }
      this.readMedia();
    }
  }

  /** 读取数据库 */
  readDatabase(id: string) {
    return this.databaseService.read<Inspection>('inspection')[id]
  }
  /** 由于多媒体文件保存在内存中，因此需要在内存中读取 */
  readMedia() {
    const taskid = this.activatedRoute.snapshot.paramMap.get('taskid');
    const houseid = this.activatedRoute.snapshot.paramMap.get('houseid');
    const photos = this.inspectionService.read('photo', { taskid, houseid } as InspectionParamMap);
    const audios = this.inspectionService.read('audio', { taskid, houseid } as InspectionParamMap);
    const videos = this.inspectionService.read('video', { taskid, houseid } as InspectionParamMap);
    this.media = {
      photos: photos.length,
      audios: audios.length,
      videos: videos.length,
    };
  }
}
