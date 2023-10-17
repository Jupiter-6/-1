import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'im-pump-houses-table',
  templateUrl: './pump-houses-table.component.html',
  styleUrls: ['./pump-houses-table.component.scss']
})
export class PumpHousesTableComponent implements OnInit {

  /** 列表数据 */
  @Input() list ? = [];

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  trClick(item: any): void {
    this.selectedChange.emit(item);
  }

}
