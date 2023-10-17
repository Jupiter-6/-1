import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inspection, InspectionItem } from '@shared/entities/database.type';
import { InspectionParamMap, ResourceUrl } from '@shared/entities/inspection.type';
import { DatabaseService } from '@shared/services/_database.service';
import { UppyFile } from '@uppy/core';
import { InspectionService } from '../inspection.service';

@Component({
  selector: 'im-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [];
  params = {} as InspectionParamMap;
  item = {} as Inspection;
  project = {} as InspectionItem;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private inspectionService: InspectionService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    /** 订阅路由参数 */
    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.params = data.params;
      this.read();
    })
  }
  startCamera() {
    this.showWebcam = true;
  }
  /** 读取数据库 */
  readDatabase(id: string) {
    return this.databaseService.read<Inspection>('inspection')[id]
  }
  /** 读取 */
  read() {
    const source = this.inspectionService.read('video', this.params);
    this.source = source;
    this.item = this.readDatabase(this.params.taskid!);
    this.project = this.item.detail?.items.find(i => i.id === this.params.projectid) || {} as InspectionItem;
  }
  /** 增加 */
  onSeclected(event: {
    [key: string]: UppyFile<any>
  }) {
    const obj = Object.values(event)[0];
    const source = URL.createObjectURL(obj.data);
    console.log(obj);
    
    this.inspectionService.set('video', {
      id: this.params.projectid!, url: source,
      name: new Date().getTime() + '-' + obj.name
    });
    this.read();
  }
  /** 删除 */
  ondelete(url: ResourceUrl) {
    this.inspectionService.del('video', url);
    this.read();
  }
}
