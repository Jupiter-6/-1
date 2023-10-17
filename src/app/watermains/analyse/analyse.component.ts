import { Component, OnInit, ViewChild } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { SensorPickerComponent } from '@shared/components/sensor-picker/sensor-picker.component';
import { WatermainsService } from '@shared/services/watermains.service';
import { format } from 'date-fns';
import { getLineptions } from './charts.config';

@Component({
  selector: 'im-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {
  @ViewChild('sensorPicker', { static: true }) sensorPicker!: SensorPickerComponent; // 地图
  sensorListShow: boolean = false;
  sensorCharts: any[] = [];
  searchParams = [
    { name: 'stationtype', value1: '1,2,3,4' }
  ];
  dataTypeMap: { [key: string]: any } = {};
  constructor(
    private watermainsService: WatermainsService,
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
    if (this.watermainsService.sensor) {
      this.selectSensor(this.watermainsService.sensor);
    }
  }

  onconfirm(data: {
    dmaids: string;
    stationtype: string;
  }) {
    this.sensorListShow = true;
    const searchParams = [];
    const { dmaids, stationtype } = data;
    dmaids && searchParams.push({ name: 'dmaids', value1: dmaids });
    if (stationtype) {
      searchParams.push({ name: 'stationtype', value1: stationtype })
    } else {
      searchParams.push({ name: 'stationtype', value1: '1,2,3,4' })
    }
    this.searchParams = searchParams;
    setTimeout(() => {
      this.sensorPicker.search();
    });
  }

  selectSensor(sensor: any) {
    const item = this.sensorCharts.find(i => i.sensorid === sensor.sensorid);
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
        { name: 'sensorid', value1: sensor.sensorid },
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
