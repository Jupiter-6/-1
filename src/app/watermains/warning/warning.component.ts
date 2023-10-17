import { Component, OnInit } from '@angular/core';
import { WatermainsService } from '@shared/services/watermains.service';

@Component({
  selector: 'im-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  loading: boolean = false;
  list: any[] = []
  constructor(
    private watermainsService: WatermainsService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.loading = true;

    const pager = {
      pageSize: 20000,
      pageNumber: 1
    };
    this.watermainsService.query_apprealtime({
      pager
    }).subscribe(data => {
      this.loading = false;
      this.list = data.items || [];
    })
  }
}
