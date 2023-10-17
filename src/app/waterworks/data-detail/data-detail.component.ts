import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatermainsService } from '@shared/services/watermains.service';
import { WaterworksService } from '@shared/services/waterworks.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import { format } from 'date-fns';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { getLineptions } from '../../watermains/analyse/charts.config';

@Component({
  selector: 'im-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss']
})
export class DataDetailComponent implements OnInit {
  processList: any[] = [];
  list: any[] = []
  loading: boolean = false;
  sensorCharts: any[] = [];
  dataTypeMap: { [key: string]: any } = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private sdaApiService: SdaApiService,
    private watermainsService: WatermainsService,
    private waterworksService: WaterworksService,
    private bsLocaleService: BsLocaleService
  ) { 
    this.bsLocaleService.use('zh-cn');
  }

  ngOnInit(): void {
    this.watermainsService.datatypeQuery({})
      .subscribe(data => {
        data.items?.forEach((type: any) => {
          this.dataTypeMap[type.datatypeno] = type;
        })
      })
    if (this.waterworksService.sensor) {
      this.selectSensor(this.waterworksService.sensor);
    }

    const factoryno = this.activatedRoute.snapshot.params.id;
    // 查询工艺
    this.sdaApiService.processQueryenabled({
      criteria: [
        { name: 'factoryno', value1: factoryno },
      ]
    }).subscribe(data => {
      this.processList = data.items;
    })
  }

  querySensors(modal: ModalDirective, process: any) {
    modal.show();
    this.loading = true;
    this.list = [];
    this.sdaApiService.queryenabled({
      criteria: [
        { name: 'stationcls', value1: 'factory' },
        { name: 'processid', value1: process.id },
      ]
    }).subscribe(data => {
      this.loading = false;
      this.list = data.items;
    })
  }

  selectSensor(sensor: any) {
    const item = this.sensorCharts.find(i => i.id === sensor.id);
    if (item) {
      return false;
    }
    sensor.loading = true;
    sensor.date = new Date();
    sensor.data = [];

    this.sensorCharts.unshift(sensor);
    this.queryData(sensor);
    return true;
  }

  /** 查询采集器数据 */
  queryData(sensor: any) {
    this.watermainsService.queryoneday({
      criteria: [
        { name: 'sensorid', value1: sensor.id },
        { name: 'date', value1: format(sensor.date, 'yyyy-MM-dd') },
      ]
    }).subscribe(data => {
      sensor.loading = false;
      sensor.data = data.items || [];
      sensor.options = getLineptions(sensor.data);
    })
  }
  /** 删除采集器数据图表 */
  remove(chart: any) {
    const index = this.sensorCharts.findIndex(i => i === chart);
    this.sensorCharts.splice(index, 1);
  }
  /** 重新加载数据 */
  reload(chart: any) {
    chart.loading = true;
    this.queryData(chart);
  }
}
