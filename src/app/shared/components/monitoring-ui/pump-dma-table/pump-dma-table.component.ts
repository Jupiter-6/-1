import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'im-pump-dma-table',
  templateUrl: './pump-dma-table.component.html',
  styleUrls: ['./pump-dma-table.component.scss']
})
export class PumpDmaTableComponent implements OnInit {

  /** 列表数据 */
  @Input() list ? = [];

  constructor() { }

  ngOnInit(): void {
  }

}
