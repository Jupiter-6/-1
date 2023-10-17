import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DatabaseService } from '@shared/services/_database.service';
import { RealtimeService } from '../realtime.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
@Component({
  selector: 'im-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  host: {
    'class': 'bg-light d-block'
  }
})
export class DetailsComponent implements OnInit {

  item: any = null;

  pagestatus = 'edit';

  /** 表单状态 */
  options: FormlyFormOptions = {
    formState: {
      /** 全部不可编辑 */
      disabled: true,
    },
  };
  /** 延迟时间 */
  dayOption: any = [];

  /** 选择的时间 */
  dayNum: any;

  /** 泵房沉默时间 */
  houseSilenceOpt: any = [];
  /** 选择的泵房沉默时间 */
  selectedHouseSilence: any;

  model: any = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    public service: RealtimeService,
    private router: Router,
    public itsysService: ItsysApiService,
  ) { }

  ngOnInit(): void {
    console.log('details ngoninit');
    console.log('item = ', this.service.selectedItem);
    this.pagestatus = this.activatedRouter.snapshot.params.pagestatus || 'edit';
    this.item = this.service.selectedItem;
    this.item._ctime = new Date(this.item.ctime);
    this.item._stime = new Date(this.item.stime);
    // this.item.confirmer = '00ad4397-cced-4ba5-be72-9637e1a94192';
    // console.log('this.item = ', this.item);
    this.fields = this.service.initFields(this.pagestatus, this.item, this.model);
    this.model = this.item;
    this.options.formState.disabled = true;

    // 查询延迟天数
    this.itsysService.getRealtimeDelay().then(list => {
      this.dayOption = list;
      this.dayNum = this.dayOption[7].value;
    });

    // 查询泵房沉默时间
    this.itsysService.getHouseSilence().then(list => {
      this.houseSilenceOpt = list;
      this.selectedHouseSilence = this.houseSilenceOpt[7].value;
    });
  }

  /** 确认 */
  confirm(num: number): void {
    const params = {
      items: [{ id: this.item.id }],
      reqExtends: { actionvalue: num }
    };
    this.service.confirm(params).then(res => {
      if (res) {
        this.model = { ...this.model, ...res.items[0] };
      }
    });
  }

  /** 延迟 */
  delay(): void {
    const params = {
      items: [{
        id: this.item.id,
        delaydaynum: this.dayNum
      }]
    };
    this.service.delay(params).then(res => {
      if (res) {
        this.model = { ...this.model, ...res.items[0] };
      }
    });
  }

  /** 跳转到生成工单 */
  goOrder(status: string): void {
    // status=2表示已确认数据，不能进行后续操作
    if (this.item.status === 2) {
      return;
    }
    this.router.navigate([
      `/realtime/order/${this.item.id}`,
    ], {
      queryParams: { pagestatus: status }
    });
  }

  /** 泵房沉默/取消泵房沉默 */
  async silence(num: number): Promise<void> {
    let id: any = null;
    if (this.item.stationcls === 'factory') {
      id = this.item.factoryid;
    } else if (this.item.stationcls === 'station') {
      id = this.item.stationid;
    }
    const params1 = {
      items: [id],
      reqExtends: { actionvalue: num, silencevalue: this.selectedHouseSilence }
    };
    this.service.houseSilence(params1).then(res => {
      if (!res) {
        return;
      }
      const params2 = {
        items: [{
          stationcls: this.item.stationcls,
          stationid: id
        }],
        reqExtends: { actionvalue: num, silencevalue: this.selectedHouseSilence }
      };
      this.service.realTimeSilence(params2).then((res2: any) => {
        if (!res2) {
          return;
        }
        this.model = { ...this.model, confirmed: num === 1 ? 3 : num };
      });
    });


  }

}
