import { Component, OnInit } from '@angular/core';
import { DelonApiService } from '@shared/services/delon-api.service';

@Component({
  selector: 'im-mock-test',
  templateUrl: './mock-test.component.html',
  styleUrls: ['./mock-test.component.scss']
})
export class MockTestComponent implements OnInit {
  mocke_data: any = null;
  constructor(
    private delonApiService: DelonApiService
  ) { }

  ngOnInit(): void { }
  getMockData() {
    this.delonApiService.getMockData().subscribe(data => {
      this.mocke_data = data;
    })
  }
}
