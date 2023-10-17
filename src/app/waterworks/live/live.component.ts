import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WatermainsService } from '@shared/services/watermains.service';
import { WaterworksService } from '@shared/services/waterworks.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import { format } from 'date-fns';

@Component({
  selector: 'im-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  data: any = {};
  processList: any[] = [];
  currentProcess: any = {};
  list: any[] = []
  loading: boolean = false;
  valueMap = new Map();
  date = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public waterworksService: WaterworksService,
    private sdaApiService: SdaApiService,
    private watermainsService: WatermainsService
  ) { }

  ngOnInit(): void {
    const factoryno = this.activatedRoute.snapshot.params.id;
    this.waterworksService.InitRealTimeData()
      .then(() => {
        this.data = this.waterworksService.factorys.find(i => i.factoryno === factoryno) || {};
      })
    // 查询工艺
    this.sdaApiService.processQueryenabled({
      criteria: [
        { name: 'factoryno', value1: factoryno },
      ]
    }).subscribe(data => {
      this.processList = data.items;
      if (data.items?.length) {
        this.currentProcess = data.items[0];
        this.getListData();
      }
    })
    // 获取数据类型
    if (!this.waterworksService.dataTypeMap.size) {
      this.watermainsService.datatypeQuery({})
        .subscribe(data => {
          data?.items.map((i: any) => {
            this.waterworksService.dataTypeMap.set(i.datatypeno, i);
          })
        })
    }
  }
  /** 根据工艺获取采集器数据 */
  getListData() {
    this.loading = true;
    this.sdaApiService.queryenabled({
      criteria: [
        { name: 'stationcls', value1: 'factory' },
        { name: 'processid', value1: this.currentProcess.id },
      ]
    }).subscribe(data => {
      this.loading = false;
      this.list = data.items;

      if (data.items.length) {
        // 根据采集项编码获取值
        this.sdaApiService.queryLastvalue({
          criteria: [
            { name: 'sensorids', value1: data.items.map((i: any) => i.id).toString() },
          ]
        }).subscribe(data => {
          const map = new Map();
          data.items.map((i: any) => {
            map.set(i.id, i)
          })
          this.valueMap = map;

          const result = data.items.sort((a: any, b: any) => b.lasttime - a.lasttime);
          this.date = format(result[0].lasttime * 1000, 'yyyy-MM-dd HH:mm')
        })
      }
    })
  }
  selectProcess(process: any) {
    this.list = [];
    this.currentProcess = process;
    this.getListData();
  }
  go(item:any) {
    const factoryno = this.activatedRoute.snapshot.params.id;
    this.waterworksService.sensor = item;
    this.router.navigate(['/waterworks/data-detail/' + factoryno])
  }
}
