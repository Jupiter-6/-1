import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DatabaseService } from '@shared/services/_database.service';
import { getFields } from '../maintenance.config';
import { Maintenance } from '@shared/entities/database.type';
import { MaintenanceService } from '../maintenance.service';
import { textHeights } from 'ol/render/canvas';
import { finished } from 'stream';

@Component({
  selector: 'im-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  host: {
    'class': 'bg-light d-block'
  }
})
export class DetailsComponent implements OnInit {

  itemid = '';

  item: any = null;

  pagestatus = 'edit';

  /** 正在提交表单 */
  loading = false;

  /** 表单状态 */
  options: FormlyFormOptions = {
    formState: {
      /** 全部不可编辑 */
      disabled: true,
    },
  };

  model: any = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private service: MaintenanceService,
    private databaseService: DatabaseService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.pagestatus = this.activatedRouter.snapshot.params.pagestatus || 'edit';
    this.itemid = this.activatedRouter.snapshot.params.id;
    this.item = this.service.getDataById(this.itemid);
    const deleteLater = this.activatedRouter.snapshot.params.deleteLater;
    if (this.item) {
      this.fields = this.service.initFields(this.pagestatus, this.item, this.model);
      if (this.item.model) {
        this.model = this.item.model;
      } else {
        // 从维修历史跳转过来
        this.model = JSON.parse(JSON.stringify(this.item));
      }
      this.options.formState.disabled = this.pagestatus === 'read' || this.item.finished;
    } else {
      // this.router.navigate([
      //   `/maintenance/list/`
      // ]);
      this.location.back();
    }
    // 维修历史页面跳转过来，使用完数据后从本地数据库中删除
    if (deleteLater === 'true') {
      this.databaseService.del('maintenance', this.itemid);
    }
  }

  /** 标记完成 */
  onSubmit(model: any): void {
    this.item.model.entertime = new Date().getTime();
    // this.item = {
    //   ...this.item,
    //   finished: !this.item.finished,
    //   entertime: !this.item.finished ? new Date().getTime() : '',
    //   ...model,
    // };
    this.item.finished = !this.item.finished;
    this.item.entertime = !this.item.finished ? new Date().getTime() : '';
    this.item.model = {...model};
    // 更新缓存
    this.databaseService.set('maintenance', this.item);
    this.service.itemid_form_map[this.item.id] = this.item;
    this.options.formState.disabled = this.item.finished;
  }

  /** 表单变更 */
  modelChange(data: any): void {
    this.item.model = {
      ...this.item.model,
      ...data
    };
    this.databaseService.set('maintenance', this.item);
  }

  /** 取消下载 */
  cancelUpload(): void {
    this.databaseService.del('maintenance', this.item.id);
    const params = { item: { id: this.item.id } };
    this.service.canceldownload(params);
    this.location.back();
  }

  /** 非故障 */
  notFault(): void {
    this.model = {
      pareaid: this.item.pareaid, // 泵区
      failclass: this.item.failclass, // 故障分类
      deviceid: this.item.deviceid, // 设备
      equip: this.item.equip, // 设备维修
      cutoff: this.item.cutoff, // 停水
      phenomenon: '正常，无故障', // 故障现象
      analyse: '暂未发现故障', // 故障原因
      solution: '暂无需维修', // 解决方案
      // summary: '无故障',// 维修结论
      labors: this.item.labors || 1, // 人工
      hours: this.item.hours || ((this.item.scanenter && this.item.scanexit) ? Math.ceil((this.item.scanexit - this.item.scanenter) / 1000 / 60 / 60) : (
        (this.item.bgntime && this.item.endtime) ? Math.ceil((this.item.endtime - this.item.bgntime) / 1000 / 60 / 60) : 0
      )), // 工时
      workcompany: this.item.workcompany || this.item.workcompanys.length ? this.item.workcompanys[0] : '', // 维修单位
      workmans: this.item.workmans || this.databaseService.user.name, // 维修人员
      worksigndate: this.item.worksigndate || this.item.scanexit || new Date() || undefined, // 维修人员签字时间
      offbgntime: this.item.offbgntime || undefined, // 停水开始时间
      offendtime: this.item.offendtime || undefined, // 停水结束时间
      // cutoffhour1: this.item.cutoffhour1 || '',// 计划停水时长
      // cutoffhour2: this.item.cutoffhour2 || '',// 实际停水时长
      bgntime: this.item.bgntime || this.item.scanenter || new Date() || undefined, // 维修开始时间
      endtime: this.item.endtime || this.item.scanexit || new Date() || undefined, // 维修结束时间
      finish: true,
      entertime: new Date(),
      enteruser: this.databaseService.user.id,
    };
    this.modelChange(this.model);
    this.onSubmit(this.model);
  }

}
