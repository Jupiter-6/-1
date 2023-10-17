import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DatabaseService } from '@shared/services/_database.service';
import { RealtimeService } from '../realtime.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
@Component({
  selector: 'im-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  item: any = null;
  loading = false;
  pagestatus = 'edit';

  userJSON = sessionStorage.getItem('user') || '';
  userObj = JSON.parse(this.userJSON);

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
    public service: RealtimeService,
    private router: Router,
    public itsysService: ItsysApiService,
    private _location: Location,
  ) { }

  async ngOnInit(): Promise<void> {
    this.pagestatus = this.activatedRouter.snapshot.queryParams.pagestatus || 'edit';
    // 补全相关数据
    await this.service.getInfo();
    this.item = this.service.selectedItem;
    if (this.pagestatus === 'edit') {
      const newEntity = await this.service.create();
      // 泵房、报警说明 字段赋值
      this.model = {
        ...newEntity,
        houseid: this.item.deviceRelation.houseEntity?.id || this.item.deviceRelation.houseid,
        pareaid: this.item.deviceRelation.pareaEntity?.id || this.item.deviceRelation.pareaid,
        deviceid: this.item.deviceRelation.id,
        sourceid: this.item.id,
        mtsource: 'ALARM',
        phenomenon: this.item.phenomenon,
      };
    } else {
      this.model = {
        houseid: this.item.deviceRelation.houseEntity?.id || this.item.deviceRelation.houseid,
        pareaid: this.item.deviceRelation.pareaEntity?.id || this.item.deviceRelation.pareaid,
        deviceid: this.item.deviceRelation.id,
        mtclass: this.item.val.mtclass,
        failclass: this.item.val.failclass,
        mtsource: this.item.val.mtsource,
        depart: this.item.val.depart,
        teamid: this.item.val.teamid,
        phenomenon: this.item.val.phenomenon,
      };
    }
    // console.log('this.model = ', this.model);
    this.fields = this.service.initOrderFields(this.pagestatus, this.item, this.model);
    this.options.formState.disabled = this.pagestatus === 'read';

  }

  // async onSubmit(model: any) {
  //   // this.loading = true;
  //   // await this.service.upload(model, this.picList).then((bool) => {
  //   //   if (bool !== true) {
  //   //     this.messageService.show({ content: '错误', type: 'danger' });
  //   //     return;
  //   //   } else {
  //   //     this.messageService.show({ content: '上传成功', type: 'success' });
  //   //   }
  //   // });
  //   // this.loading = false;
  // }
  /** 保存 */
  save(): void {
    this.service.doInsert({ item: this.model }).then(res => {
      if (res) {
        // this.service.selectedItem = {...this.service.selectedItem, ...this.model};
        this.service.selectedItem.val = res.item;
        this.service.selectedItem.isWork = true;
        this.service.selectedItem.confirmed = 2;
        this.service.selectedItem.confirmer = this.userObj?.id;
        // 返回
        this._location.back();
      }
    });

  }

  /** 保存并发布 */
  saveAndPub(): void {
    this.service.insertAndpublish({ item: this.model }).then(res => {
      if (res) {
        // this.service.selectedItem = {...this.service.selectedItem, ...this.model};
        this.service.selectedItem.val = res.item;
        this.service.selectedItem.isWork = true;
        this.service.selectedItem.confirmed = 2;
        this.service.selectedItem.confirmer = this.userObj?.id;
        // 返回
        this._location.back();
      }
    });
  }

}
