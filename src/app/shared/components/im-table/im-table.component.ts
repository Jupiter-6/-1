import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from './im-table.type';
0;

@Component({
  selector: 'im-table',
  templateUrl: './im-table.component.html',
  styleUrls: ['./im-table.component.scss'],
})
export class ImTableComponent implements OnInit {
  // tabs数据
  @Input() tableConfig: any;
  // @Input() tableData?: [];
  // @Output() OnSelectOut = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
  getNumber(value: any) {
    if (value) {
      let keepThree = value.toString().split('.');
      if (keepThree[1] && keepThree[1].length > 0) {
        return value.toFixed(3);
      } else if (keepThree[1] && keepThree[1].length == 2) {
        return value.toFixed(2);
      } else if (keepThree[1] && keepThree[1].length == 1) {
        return value.toFixed(1);
      } else {
        return value;
      }
    } else if (value === 0) {
      return '0';
    } else {
      return '-';
    }
  }
}
