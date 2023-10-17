import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'im-list-tip',
  templateUrl: './list-tip.component.html',
  styleUrls: ['./list-tip.component.scss']
})
export class ListTipComponent implements OnInit {
  /** 数据名、类型 */
  @Input() name?: string = '';
  /** 数据查询中 */
  @Input() loading?: boolean = false;
  /** 是否有数据 */
  @Input() data?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
