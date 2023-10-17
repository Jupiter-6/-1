import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { getDynamicOptions, getEasyOptions, getLineptions } from './charts.config';

@Component({
  selector: 'im-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {

  easyOptions: EChartsOption = {};
  dynamicOptions: EChartsOption = {};
  updateOptions: EChartsOption = {};

  lineOptions: EChartsOption = {};

  private oneDay = 24 * 3600 * 1000;
  private now!: Date;
  private value!: number;
  private data!: any[];
  private timer: any;

  constructor() { }

  ngOnInit(): void {

    this.easyOptions = getEasyOptions();
    this.lineOptions = getLineptions();
    this.initDynamicOptions();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }



  initDynamicOptions() {
    // generate some random testing data:
    this.data = [];
    this.now = new Date(1997, 9, 3);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }
    // initialize chart options:
    this.dynamicOptions = getDynamicOptions(this.data);
    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 1000);
  }
  randomData() {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }
}
