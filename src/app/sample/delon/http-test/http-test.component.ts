import { Component, OnInit } from '@angular/core';
import { DelonApiService } from '@shared/services/delon-api.service';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';

@Component({
  selector: 'im-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {

  response: any = null;
  loading: boolean = false;

  constructor(
    private delonApiService: DelonApiService,
    private monitoringApiService: MonitoringApiService
  ) { }

  ngOnInit(): void { }

  getData() {
    this.loading = true;
    this.response = null;
    this.delonApiService.getData().subscribe(data => {
      this.loading = false;
      this.response = data;
    })
  }
  getData2() {
    this.monitoringApiService.queryHouse({ pager: { pageNumber: 1, pageSize: 15 }, criteria: [] })
      .subscribe((data) => {
        console.log(data);
      })
  }
}
