import { Component, OnInit } from '@angular/core';
import { WaterworksService } from '@shared/services/waterworks.service';

@Component({
  selector: 'im-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  constructor(
    public waterworksService: WaterworksService
  ) { }

  ngOnInit(): void {
    this.waterworksService.InitRealTimeData().then(() => { });
  }

}
