import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'im-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, OnChanges {

  /** 表格数据 */
  @Input() dataList: any = [];

  /** 表头与代码对应关系 */
  @Input() key_title: any = {};

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  keys: string[] = [];
  titles: string[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  trClick(item: any): void {
    this.selectedChange.emit(item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.key_title) {
      this.keys = Object.keys(this.key_title);
      this.titles = Object.values(this.key_title);
    }
  }

}
