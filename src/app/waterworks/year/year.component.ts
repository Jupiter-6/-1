import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons, SType } from '@shared/data/statistical-types.data';
import { WaterworksService } from '@shared/services/waterworks.service';
import { getLineptions } from '../charts.config';

@Component({
  selector: 'im-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
  icons: { [key: string]: any } = {};
  loading: boolean = false;
  list: any[] = [];
  constructor(
    public waterworksService: WaterworksService,
    private domSanitizer: DomSanitizer,
  ) {
    for (const key in Icons) {
      this.icons[key] = this.domSanitizer.bypassSecurityTrustResourceUrl(Icons[key] as string)
    }
  }

  ngOnInit(): void {
    this.getData(this.waterworksService.selectedTypes.year);
  }

  async getData(type: SType) {
    this.loading = true;
    this.list = [];
    const { factoryMap, factorynos } = await this.waterworksService.InitBasicData()
    this.waterworksService.statisticsyear({
      criteria: [
        { name: "field", value1: this.waterworksService.selectedTypes.year.value },
        { name: "factorynos", value1: factorynos }
      ]
    }).subscribe((data) => {
      this.loading = false;
      this.list = data.items.map((i: any) => {
        const name = factoryMap[i.factoryno] || '公司合计';
        return {
          name,
          data: i.values,
          factoryno: i.factoryno,
          type: 'line',
          options: getLineptions({
            name,
            data: i.values,
            unit: this.waterworksService.selectedTypes.year.unit,
            type: 'line'
          })
        }
      }).reverse()
    })
  }

  updateChartType(item: any, type: 'bar' | 'line') {
    item.options.series[0].type = type
    item.options = { ...item.options }
  }
}
