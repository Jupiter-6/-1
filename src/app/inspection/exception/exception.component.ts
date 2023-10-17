import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from '@shared/components/message/message.service';
import { Inspection, InspectionItem } from '@shared/entities/database.type';
import { InspectionParamMap, ResourceUrl } from '@shared/entities/inspection.type';
import { DatabaseService } from '@shared/services/_database.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { UppyFile } from '@uppy/core';
import { InspectionService } from '../inspection.service';
import { getFields } from './exception.config';

@Component({
  selector: 'im-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})
export class ExceptionComponent implements OnInit {
  showWebcam: boolean = false;
  source: Array<ResourceUrl> = [];
  params = {} as InspectionParamMap;
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];
  item = {} as Inspection;
  project = {} as InspectionItem;
  constructor(
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private inspectionService: InspectionService,
    private itsysApiService: ItsysApiService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    /** 订阅路由参数 */
    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.params = data.params;
      this.read();
    })
  }

  /** 读取 */
  read() {
    this.item = this.readDatabase(this.params.taskid!);
    this.source = this.readPhotoSource();
    const house = this.item.detail?.houses.find(i => i.id === this.params.houseid);
    const device = this.item.detail?.devices.find(i => i.id === this.params.deviceid);
    const project = this.item.detail?.items.find(i => i.id === this.params.projectid);
    const event: { [key: string]: any } = project?.event || {};
    const { eventcls, eventlevel, eventtext } = event;
    /** 给表单赋值 */
    this.model = {
      person: this.databaseService.user.id,
      routetask_item_id: project?.id,
      houseid: house?.houseid,
      pareaid: device?.device_pareaid,
      deviceid: device?.deviceid,
      eventsource: 1,
      status: 0,
      eventcls,
      eventlevel,
      eventtext,
    };
    this.project = project || {} as InspectionItem;
    this.fields = getFields(this.itsysApiService, house, device)
  }
  readPhotoSource() {
    return this.inspectionService.read('exception', this.params);
  }
  /** 读取数据库 */
  readDatabase(id: string) {
    return this.databaseService.read<Inspection>('inspection')[id]
  }
  onSubmit(model: any) {
    console.log(model);
    if (this.form.valid) { // 表单有效
      this.project.event = model;
      this.databaseService.set('inspection', this.item);
      this.messageService.show({
        type: 'success',
        content: '表单已保存到本地',
      })
    }
  }
  startCamera() {
    this.showWebcam = true;
  }
  /** 新增 */
  onSeclected(event: {
    [key: string]: UppyFile<any>
  }) {
    const image = Object.values(event)[0];
    const source = URL.createObjectURL(image.data);
    const trustUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(source);
    this.inspectionService.set('exception', {
      id: this.params.projectid!, url: trustUrl,
      name: new Date().getTime() + '-' + image.name
    });
    this.source = this.readPhotoSource();
  }
  /** 删除 */
  ondelete(image: ResourceUrl) {
    this.inspectionService.del('exception', image);
    this.source = this.readPhotoSource();
  }
}
