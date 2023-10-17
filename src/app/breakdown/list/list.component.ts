import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '@shared/services/_database.service';
import { addDays, addMonths, format, subMonths } from 'date-fns';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BreakdownService } from '../breakdown.service';

export interface Item {
  id: string;
  itemdate: string;
  itemtime: string;
  housename: string;
  type: string;
  level: string;
}

@Component({
  selector: 'im-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading = false;

  selectedrange = 1;
  itemList: Item[] = [];

  bsValue: Date[] = [];
  today = new Date();
  temporaryModel = {};
  temporaryPicList = [];
  /** 日期选择组件的最大最小值 */
  maxDate = this.today;
  minDate = new Date(this.today.getFullYear() - 20, this.today.getMonth());

  constructor(
    private bsLocaleService: BsLocaleService,
    private service: BreakdownService,
    private databaseService: DatabaseService,
    private router: Router,
  ) {
    // 设置日期选择组件为中文
    this.bsLocaleService.use('zh-cn');
  }

  ngOnInit(): void {
    this.rangeChange(1);
  }

  async rangeChange(type: number): Promise<void> {
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
        return;
    }
    const params = {
      criteria: [
        {
          name: 'createtime',
          value1: format(subMonths(this.today, num), 'yyyy-MM-dd'),
          value2: format(addDays(this.today, 1), 'yyyy-MM-dd')
        },
        {
          name: 'person',
          value1: this.databaseService.user.id
        }
      ]
    };
    console.log(params);
    this.loading = true;
    this.itemList = [];
    await this.service.appquery(params).then((data) => {
      this.loading = false;
      // console.log(data);
      this.itemList = data;
    });
  }

  /** 日期选择的确定按钮事件 */
  async submit(): Promise<void> {
    this.loading = true;
    this.itemList = [];

    const params = {
      criteria: [
        {
          name: 'person',
          value1: this.databaseService.user.id,
        }
      ] as any
    };
    if (this.bsValue.length) {
      const dd = format(this.bsValue[0], 'yyyy-MM-dd');
      const ss = format(addDays(this.bsValue[1], 1), 'yyyy-MM-dd');
      params.criteria.push({
        name: 'createtime',
        value1: dd,
        value2: ss
      });
    }
    await this.service.appquery(params).then((data) => {
      this.loading = false;
      // console.log(data);
      this.itemList = data;
    });
  }

  /** 跳转到详情 */
  godetails(id: string): void {
    this.router.navigate([
      `/breakdown/details/${id}`,
      { itemid: id },
    ]);
  }

}
