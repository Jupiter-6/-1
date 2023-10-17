import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Inspection, InspectionHouse } from '@shared/entities/database.type';
import { InspectionParamMap } from '@shared/entities/inspection.type';
import { InspectionApiService } from '@shared/services/inspection-api.service';
import { DatabaseService } from '@shared/services/_database.service';
import { InspectionService } from '../inspection.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'im-pump-houses',
  templateUrl: './pump-houses.component.html',
  styleUrls: ['./pump-houses.component.scss']
})
export class PumpHousesComponent implements OnInit {

  /** 页面数据 */
  item = {} as Inspection;
  itemDetailHousesUndone: InspectionHouse[] = [];
  itemDetailHousesDone: InspectionHouse[] = [];
  showWebcam: boolean = false;
  media = { photos: 0, audios: 0, videos: 0 };
  loading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private inspectionService: InspectionService,
    private inspectionApiService: InspectionApiService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.dataDistribution();
    this.readMedia();
  }
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
  /** 数据分配 */
  dataDistribution() {
    const taskid = this.activatedRoute.snapshot.paramMap.get('taskid');
    if (!taskid) { return false; }
    this.item = this.readDatabase(taskid);
    for (const house of this.item.detail?.houses || []) {
      if (house.itemdone < house.itemcount) {
        this.itemDetailHousesUndone.push(house);
      } else {
        this.itemDetailHousesDone.push(house);
      }
    }
    return true;
  }
  /** 读取数据库 */
  readDatabase(id: string) {
    return this.databaseService.read<Inspection>('inspection')[id]
  }
  /** 由于多媒体文件保存在内存中，因此需要在内存中读取 */
  readMedia() {
    const taskid = this.activatedRoute.snapshot.paramMap.get('taskid');
    const photos = this.inspectionService.read('photo', { taskid } as InspectionParamMap);
    const audios = this.inspectionService.read('audio', { taskid } as InspectionParamMap);
    const videos = this.inspectionService.read('video', { taskid } as InspectionParamMap);
    this.media = {
      photos: photos.length,
      audios: audios.length,
      videos: videos.length,
    };
  }
  /** 取消任务 */
  abortTask(modal: ModalDirective,) {
    this.loading = true;
    this.inspectionApiService.updatestatus({
      item: { id: this.item.id }, reqExtends: { status: 2 }
    }).subscribe(({ code }) => {
      this.loading = false;
      modal.hide();
      if (code === '0') {
        this.databaseService.del('inspection', this.item.id);
        this._location.back();
      }
    })
  }
  /** 确认完成 */
  confirmTask(modal: ModalDirective,) {
    this.loading = true;
    this.inspectionApiService.updatestatus({
      item: { id: this.item.id }, reqExtends: { status: 5 }
    }).subscribe(({ code }) => {
      this.loading = false;
      modal.hide();
      if (code === '0') {
        this.item.status = 5;
        this.databaseService.set('inspection', this.item);
        this._location.back();
      }
    })
  }
}
