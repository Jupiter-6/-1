import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { addDays, format, subMonths } from 'date-fns';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { MaintenanceService } from '../maintenance.service';
import { DatabaseService } from '@shared/services/_database.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgxViewerDirective } from 'ngx-viewer';

export interface Item {
  id: string;
  itemdate: string;
  itemtime: string;
  photonum: string;
  audionum: string;
  videonum: string;
  partnum: string;
  type: string;
  code: string;
  name: string;
  detail: string;
  conclusion: string;
  source: string;
}

@Component({
  selector: 'im-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  loading = false;

  selectedrange = 1;

  value?: number = 3;

  itemList: Item[] = [];

  today = new Date();

  model: any = {};
  formGroup: FormGroup = new FormGroup({});

  fields: FormlyFieldConfig[] = [];

  constructor(
    private service: MaintenanceService,
    private databaseService: DatabaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rangeChange(this.selectedrange);
  }

  rangeChange(type: number): void {
    this.selectedrange = type;
    let num = 0;
    switch (type) {
      case 1:
        num = 1;
        break;
      case 2:
        num = 2;
        break;
      case 3:
        num = 3;
        break;
      case 4:
        num = 12;
        break;
      case 5:
        this.fields = this.service.getQueryFields();
        return;
    }
    const params = {
      criteria: [
        {
          name: 'entertime',
          value1: format(subMonths(this.today, num), 'yyyy-MM-dd HH:mm'),
          value2: format(addDays(this.today, 1), 'yyyy-MM-dd HH:mm')
        },
        {
          name: 'status',
          value1: this.value
        },
        {
          name: 'fieldsort',
          value1: 'entertime'
        }
      ]
    };
    this.loading = true;
    this.itemList = [];
    this.service.queryHisList(params).then((datas) => {
      // console.log(datas);
      this.loading = false;
      this.itemList = datas;
    });
  }

  onSelect(data: TabDirective): void {
    if (data.heading === '待审核') {
      this.value = 3;
    } else {
      this.value = 8;
    }
    this.rangeChange(this.selectedrange);
  }

  /** 跳转到详情页 */
  goDetail(item: any): void {
    // 把表单信息写入本地数据库，方便详情页读取数据，读取完毕后删除
    const maintenance = {
      ...item,
      uploaded: true,
      finished: true,
      parts: item.partcount || 0,
      house_name: item.vo?.house_name || '',
      parea_name: item.vo?.parea_name || '',
      device_name: item.vo?.device_name || '',
      house_address: item.vo?.house_address || '',
      partnum: item.partcount?.toString() || '0',
      photonum: item.photos?.toString() || '0',
      audionum: item.audios?.toString() || '0',
      videonum: item.videos?.toString() || '0',
    };
    this.databaseService.set('maintenance', maintenance);
    // console.log(maintenance);
    this.router.navigate([`/maintenance/details/${item.id}`], {
      queryParams: { deleteLater: true, pagestatus: 'read' }
    });
  }

  /** 模态框查询 */
  onSubmit(model: any): void {
    // console.log(model);
    const params = {
      criteria: [
        {
          name: 'entertime',
          value1: format(new Date(model.bgntime).getTime(), 'yyyy-MM-dd'),
          value2: format(new Date(model.endtime).getTime(), 'yyyy-MM-dd')
        },
        {
          name: 'status',
          value1: this.value
        },
        {
          name: 'failclass',
          value1: model.failclass || null
        },
        {
          name: 'mtclass',
          value1: model.mtclass || null
        }
      ]
    };
    this.loading = true;
    this.itemList = [];
    this.service.queryHisList(params).then((datas) => {
      // console.log(datas);
      this.loading = false;
      this.itemList = datas;
    });
  }

  /** 复位 */
  reset(): void {
    this.model = { bgntime: new Date(), endtime: new Date(),  mtclass: null};
  }

}
