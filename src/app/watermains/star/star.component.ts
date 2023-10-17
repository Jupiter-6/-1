import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatermainsService } from '@shared/services/watermains.service';

@Component({
  selector: 'im-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  loading: boolean = false;
  list: any[] = []
  constructor(
    private watermainsService: WatermainsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.loading = true;
    this.watermainsService.query_appStationModel({
      criteria: [
        { name: 'myfavorite', value1: 1 },
        { name: 'ascending', value1: 1 },
        { name: 'stationtype', value1: '1,2,3,4' }
      ]
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
