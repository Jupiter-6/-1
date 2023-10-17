import { Component, OnInit, OnDestroy, } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '@shared/services/_database.service';
import { Inspection, InspectionDevice, InspectionItem } from '@shared/entities/database.type';
import { takeUntil } from 'rxjs/operators';
import { ProjectItemMap } from '@shared/data/inspection.data';
import { Subject } from 'rxjs';
import { generateForm, getDefaultValue, getValueText, ProjectValue } from './projects.config';
import { InspectionService } from '../inspection.service';
import { InspectionParamMap } from '@shared/entities/inspection.type';
import { format } from 'date-fns';

@Component({
  selector: 'im-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectItemMap = ProjectItemMap;
  destroy = new Subject();
  params = {} as { [key: string]: any };
  itemid: string = '';
  /** 页面数据 */
  item = {} as Inspection;
  device = {} as InspectionDevice;
  projectIndex: number = 0;
  project = {} as InspectionItem;
  /** 多媒体文件导航 */
  link = { photo: '', video: '', audio: '', exception: '' };
  /** 表单相关 */
  model: ProjectValue = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  media = { photos: 0, audios: 0, videos: 0 };
  constructor(
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private inspectionService: InspectionService,
    private router: Router
  ) { }

  /** 此组件活动频繁，以防万一，添加销毁释放内存逻辑 */
  ngOnDestroy(): void {
    this.destroy.next()
  }

  ngOnInit(): void {
    /** 订阅查询参数 */
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroy)
    ).subscribe(({ itemid }) => {
      this.itemid = itemid;
      const taskid = this.activatedRoute.snapshot.paramMap.get('taskid');
      if (itemid && taskid) {
        this.item = this.readDatabase(taskid);
        const index = this.item.detail?.items.findIndex(i => i.id === itemid);
        this.projectIndex = index || 0;
        this.setProject();
      }
    });
    /** 订阅路由参数 */
    this.activatedRoute.paramMap.pipe(
      takeUntil(this.destroy)
    ).subscribe((data: any) => {
      this.params = data.params;
      const { houseid, deviceid } = this.params;
      this.setLink(); // 设置多媒体链接
      this.item = this.readDatabase(this.params.taskid);
      this.device = this.item.detail?.devices.find(i => i.id === deviceid) || {} as InspectionDevice;
      /** 如果导航有项目id，那么则采用导航的项目id，如果没有则找到设备的第一个项目 */
      const project = this.itemid && this.item.detail?.items.find(i => i.id === this.itemid) || this.item.detail?.items.find(i => i.routetask_device_id === deviceid);
      /** 执行导航，允许重复，因为参数变化订阅，只有在参数变化时，才会执行。意味着会自动过滤掉重复逻辑 */
      if (project) {
        this.navigate(houseid, deviceid, project.id);
      }
    })
  }

  /** 导航 */
  navigate(houseid: string, deviceid: string, itemid: string) {
    const { taskid } = this.params;
    this.router.navigate([`/inspection/pump-house/${taskid}/${houseid}/${deviceid}`], { replaceUrl: true, queryParams: { itemid } })
  }
  /** 前进 */
  forward() {
    this.projectIndex += 1;
    const project = this.item.detail?.items[this.projectIndex];
    const device = this.item.detail?.devices.find(i => i.id === project!.routetask_device_id);
    this.navigate(device!.routetask_house_id, project!.routetask_device_id, project!.id);
  }
  /** 后退 */
  back() {
    this.projectIndex -= 1;
    const project = this.item.detail?.items[this.projectIndex];
    const device = this.item.detail?.devices.find(i => i.id === project!.routetask_device_id);
    this.navigate(device!.routetask_house_id, project!.routetask_device_id, project!.id);
  }
  /** 设置导航 */
  setLink() {
    const { deviceid, houseid, taskid } = this.params;
    this.link.photo = `/inspection/photo/${taskid}/${houseid}/${deviceid}/`;
    this.link.video = `/inspection/video/${taskid}/${houseid}/${deviceid}/`;
    this.link.audio = `/inspection/audio/${taskid}/${houseid}/${deviceid}/`;
    this.link.exception = `/inspection/exception/${taskid}/${houseid}/${deviceid}/`;
  }
  /** 设置当前项目 */
  setProject() {
    const project = this.item.detail?.items[this.projectIndex];
    if (project) {
      this.form = new FormGroup({});
      this.project = project;
      this.model = getDefaultValue(project);
      this.fields = generateForm(project);
      /** 读取多媒体数量 */
      this.readMedia(project);
    }
  }
  /** 表单变更 */
  modelChange(data: ProjectValue) {
    let project = this.item.detail!.items[this.projectIndex];
    project = {
      ...project, ...data,
      valuetext: getValueText(data, project.vt_inputcls),
      entertime: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };
    this.item.detail!.items[this.projectIndex] = project;
    this.setData();
  }
  /** 读取数据库 */
  readDatabase(id: string) {
    return this.databaseService.read<Inspection>('inspection')[id]
  }
  /** 更新数据库 */
  setData() {
    this.databaseService.set('inspection', this.item);
  }
  /** 完成 */
  confirm() {
    this.form.markAllAsTouched();
    if (this.form.valid) { // 表单有效
      this.modelChange(this.model);
      this.updateStatus(1);
      if (this.projectIndex < this.item.detail!.items.length - 1) {
        this.forward(); // 自动前进
      }
    }
  }
  /** 取消完成，恢复任务为采集状态 */
  cancel() {
    this.updateStatus(0);
  }
  /** 取消项目采集 */
  abortTask() {
    this.updateStatus(9);
  }
  updateStatus(status: 0 | 1 | 2 | 9) {
    let house = this.item.detail!.houses.find(i => i.id === this.params.houseid);
    let device = this.item.detail!.devices.find(i => i.id === this.params.deviceid);
    if (status === 0) {
      house!.itemdone -= 1;
      device!.itemdone -= 1;
      this.item.detail!.task.itemdone -= 1;
    }
    if ((status === 1) || (status === 9)) {
      house!.itemdone += 1;
      device!.itemdone += 1;
      this.item.detail!.task.itemdone += 1;
    }
    this.item.detail!.task.housedone = 0;
    this.item.detail!.houses.map(i => {
      i.itemcount === i.itemdone && (this.item.detail!.task.housedone += 1);
    })
    let project = this.item.detail!.items[this.projectIndex];
    project.status = status;
    this.project = project;
    this.setData();
    this.fields = generateForm(this.project);
  }
  /** 由于多媒体文件保存在内存中，因此需要在内存中读取 */
  readMedia(project: InspectionItem) {
    const photos = this.inspectionService.read('photo', { ...this.params, projectid: project.id } as InspectionParamMap);
    const audios = this.inspectionService.read('audio', { ...this.params, projectid: project.id } as InspectionParamMap);
    const videos = this.inspectionService.read('video', { ...this.params, projectid: project.id } as InspectionParamMap);
    this.media = {
      photos: photos.length,
      audios: audios.length,
      videos: videos.length,
    };
  }
}
