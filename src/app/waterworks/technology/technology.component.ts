import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '@shared/components/message/message.service';
import { WaterworksService } from '@shared/services/waterworks.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import * as svgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'im-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {
  @ViewChild('svg', { static: true }) svg!: ElementRef; // 地图
  data: any = {};
  currentProcess: any = {};
  loading: boolean = false;
  svgPan: any;
  constructor(
    public waterworksService: WaterworksService,
    private activatedRoute: ActivatedRoute,
    private sdaApiService: SdaApiService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const factoryno = this.activatedRoute.snapshot.params.id;
    this.waterworksService.InitRealTimeData()
      .then(() => {
        this.data = this.waterworksService.factorys.find(i => i.factoryno === factoryno) || {};
        this.selectProcessdraw(this.data.processdraws[0])
      })
  }
  selectFactory(factory: any) {
    this.data = factory;
    if (factory.processdraws[0]) {
      this.selectProcessdraw(factory.processdraws[0])
    }
  }
  selectProcessdraw(processdraw: any) {
    if (this.svgPan) { this.svgPan.destroy(); }

    this.loading = true;
    this.svg.nativeElement.innerHTML = '';

    this.currentProcess = processdraw;
    this.sdaApiService.processdrawReadbyno({
      item: { drawno: processdraw.processdrawno }
    }).subscribe(data => {
      this.loading = false;
      this.svg.nativeElement.innerHTML = data.item.svg;

      if (!data.item.sensors) { 
        this.messageService.show({
          type: 'danger',
          content: `工艺图未配置传感器编码`
        })
        return false;
      }
      this.sdaApiService.queryenabled({
        criteria: [
          { name: 'sensornos', value1: data.item.sensors }
        ]
      }).subscribe(data => {

        this.svg.nativeElement.children[0].style.width = "100%";
        this.svg.nativeElement.children[0].style.height = "240px";
        this.svgPan = svgPanZoom(this.svg.nativeElement.children[0], {
          center: false,
          controlIconsEnabled: true
        })

        if (!data.items.length) {
          this.messageService.show({
            type: 'danger',
            content: `工艺图传感器编码配置，未查询到传感器`
          })
          return false;
        }


        this.sdaApiService.queryLastvalue({
          criteria: [
            { name: 'sensorids', value1: data.items.map((i: any) => i.id).toString() },
          ]
        }).subscribe(data => {
          data.items.map((i: any) => {
            const element = document.getElementById(`T_${i.sensorno}`);
            if (element) {
              element.innerHTML = i.lastvalue;
            }
          })
        })
        return true;
      })
      return true;
    })
  }
}
