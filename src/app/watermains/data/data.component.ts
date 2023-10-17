import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatermainsService } from '@shared/services/watermains.service';

@Component({
  selector: 'im-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  loading: boolean = false;
  list: any[] = []
  constructor(
    private watermainsService: WatermainsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(data?: {
    dmaids: string;
    stationtype: string;
  }) {
    console.log(data);

    this.loading = true;
    const criteria: any[] = [
      { name: 'myfavorite', value1: 0 },
      { name: 'ascending', value1: 1 }
    ]
    const pager = {
      pageSize: 99,
      pageNumber: 1
    };
    if (data?.dmaids) {
      criteria.push({ name: 'dmaids', value1: data.dmaids })
    }
    if (data?.stationtype) {
      criteria.push({ name: 'stationtype', value1: data.stationtype })
    } else {
      criteria.push({ name: 'stationtype', value1: '1,2,3,4' })
    }
    this.watermainsService.query_appStationModel({
      criteria,
      pager,
    }).subscribe(data => {
      this.loading = false;
      this.list = data.items || [];
    })
  }
  go(item: any) {
    this.router.navigate(['/watermains/analyse']);
    this.watermainsService.sensor = item;
  }
}
