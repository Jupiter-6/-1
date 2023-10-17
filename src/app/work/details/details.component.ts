import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DatabaseService } from '@shared/services/_database.service';
import { Maintenance } from '@shared/entities/database.type';
import { WorkService } from '../work.service';
import { textHeights } from 'ol/render/canvas';
import { finished } from 'stream';


@Component({
  selector: 'im-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
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
    private service: WorkService,
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
      //   `/work/list/`
      // ]);
      this.location.back();
    }
    // 维修历史页面跳转过来，使用完数据后从本地数据库中删除
    if (deleteLater === 'true') {
      this.databaseService.del('work', this.itemid);
    }
  }

  /** 标记完成 */
  onSubmit(model: any): void {
    this.item.model.entertime = new Date().getTime();
    this.item.finished = !this.item.finished;
    this.item.entertime = !this.item.finished ? new Date().getTime() : '';
    this.item.model = { ...model };
    // 更新缓存
    this.databaseService.set('work', this.item);
    this.service.itemid_form_map[this.item.id] = this.item;
    this.options.formState.disabled = this.item.finished;
  }

  /** 表单变更 */
  modelChange(data: any): void {
    this.item.model = {
      ...this.item.model,
      ...data
    };
    this.databaseService.set('work', this.item);
  }

}
