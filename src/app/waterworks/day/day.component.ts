import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons, SType } from '@shared/data/statistical-types.data';
import { WaterworksService } from '@shared/services/waterworks.service';
import { format } from 'date-fns';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { getLineptions } from '../charts.config';

@Component({
  selector: 'im-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  icons: { [key: string]: any } = {};
  loading: boolean = false;
  list: any[] = [];
  constructor(
    public waterworksService: WaterworksService,
    private domSanitizer: DomSanitizer,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('zh-cn');
    for (const key in Icons) {
      this.icons[key] = this.domSanitizer.bypassSecurityTrustResourceUrl(Icons[key] as string)
    }
  }

  ngOnInit(): void {
    this.getData(this.waterworksService.selectedTypes.day);
  }

  async getData(type: SType) {
    this.loading = true;
    this.list = [];
    const date = format(new Date(), 'yyyy-MM');
    const { factoryMap, factorynos } = await this.waterworksService.InitBasicData()
    this.waterworksService.statisticday({
      criteria: [
        { name: "field", value1: this.waterworksService.selectedTypes.day.value },
        { name: "factorynos", value1: factorynos },
        { name: "month", value1: date }
      ]
    }).subscribe((data) => {
      this.loading = false;
      this.list = data.items.map((i: any) => {
        const name = factoryMap[i.factoryno] || '公司合计';
        return {
          name,
          data: i.values,
          factoryno: i.factoryno,
          date: new Date(),
          type: 'line',
          options: getLineptions({
            name,
            data: i.values,
            unit: this.waterworksService.selectedTypes.day.unit,
            type: 'line'
          })
        }
      }).reverse()
    })
  }

  async updateData(item: any) {
    item.loading = true;
    const date = format(item.date, 'yyyy-MM');
    const { factoryMap } = await this.waterworksService.InitBasicData()
    this.waterworksService.statisticday({
      criteria: [
        { name: "field", value1: this.waterworksService.selectedTypes.day.value },
        { name: "factorynos", value1: item.factoryno },
        { name: "month", value1: date }
      ]
    }).subscribe((data) => {
      item.loading = false;
      const i = data.items[0];

      const name = factoryMap[i.factoryno] || '公司合计';
      item = {
        name,
        data: i.values,
        factoryno: i.factoryno,
        date: new Date(),
        options: getLineptions({
          name,
          data: i.values,
          unit: this.waterworksService.selectedTypes.day.unit,
          type: item.type
        })
      }
    })
  }
  updateChartType(item: any, type: 'bar' | 'line') {
    item.options.series[0].type = type
    item.options = { ...item.options }
  }
}
