import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Tab } from './im-screen.type';
const companies = ["西郊水厂", "金岭水厂", "东风水厂", "沣水水厂", "张店水厂", "新城水库", "新城净水厂", "石桥配水厂", "南定水厂", "湖田水厂", "黄士崖泵站"];
@Component({
  selector: 'im-screen',
  templateUrl: './im-screen.component.html',
  styleUrls: ['./im-screen.component.scss'],
})
export class ImScreenComponent implements OnInit {
  @Input() dateType = 'day';
  @Input() isTable = false;
  @Input() date: any;
  @Input() screenConfig: any;
  @Input() dateTypeList = [
    {
      name: '日报',
      value: 'day',
    },
    {
      name: '月报',
      value: 'month',
    },
    {
      name: '年报',
      value: 'year',
    },
  ];
  @Output() onDateChangeOut = new EventEmitter();
  @Output() onDateTypeChangeOut = new EventEmitter();
  @Output() tableToggleOut = new EventEmitter();
  @Output() factoryToggleOut = new EventEmitter();

  @Input() factoryList = companies.map(i => {
    return { name: i, value: i }
  });

  factory = '西郊水厂';
  today = new Date();
  maxDate = this.today;
  bsValue: Date[] = [];
  bsConfig?: Partial<BsDatepickerConfig>;
  minDate = new Date(this.today.getFullYear() - 20, this.today.getMonth());
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('zh-cn');
    /** 日期选择组件的最大最小值 */
  }
  ngOnInit(): void {
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      displayOneMonthRange: true,
      minMode: this.screenConfig.dateType,
    };

    if (
      this.screenConfig.dateTypeList &&
      this.screenConfig.dateTypeList.length == 0
    ) {
      this.screenConfig.dateTypeList = this.dateTypeList;
    }

    let endDate = new Date();
    let startDate = new Date(moment().subtract(30, 'days').calendar());
    this.date = [startDate, endDate];
  }

  onDateChange(date: any) {
    this.onDateChangeOut.emit(date);
  }
  dateTypeChange(dateType: string) {
    let endDate = new Date();
    let startDate;
    if (dateType == 'day') {
      startDate = new Date(moment().subtract(30, 'days').calendar());
    } else if (dateType == 'month') {
      startDate = new Date(moment().subtract(12, 'months').calendar());
    } else if (dateType == 'year') {
      startDate = new Date(moment().subtract(10, 'years').calendar());
    } else if (dateType == 'hour') {
      startDate = endDate;
    }
    this.date = [startDate, endDate];
    if (dateType == 'hour') {
      this.bsConfig = {
        // startView: 'year',
        dateInputFormat: 'YYYY-MM',
        containerClass: 'theme-default',
        showWeekNumbers: false,
        displayOneMonthRange: true,
        minMode: 'day',
      };
    } else {
      this.bsConfig = {
        // startView: 'year',
        dateInputFormat: 'YYYY-MM',
        containerClass: 'theme-default',
        showWeekNumbers: false,
        displayOneMonthRange: true,
        minMode: this.screenConfig.dateType,
      };
    }

    this.onDateTypeChangeOut.emit(dateType);
  }

  tableToggle() {
    this.screenConfig.isTable = !this.screenConfig.isTable;
    this.tableToggleOut.emit(this.screenConfig.isTable);
  }

  factoryToggle(factory: string) {
    this.factoryToggleOut.emit(factory);
  }
}
