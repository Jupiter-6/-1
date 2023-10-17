import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'im-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  /** 图例的名称颜色集合 */
  @Input() legendList: {
    /** 名称 */
    name: string,
    /** 颜色 */
    color: string
  }[] = [];

  /** 标题 */
  @Input() title?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
