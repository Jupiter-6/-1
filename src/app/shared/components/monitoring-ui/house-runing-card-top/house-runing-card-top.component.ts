import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'im-house-runing-card-top',
  templateUrl: './house-runing-card-top.component.html',
  styleUrls: ['./house-runing-card-top.component.scss']
})
export class HouseRuningCardTopComponent implements OnInit {

  /** 标题 */
  @Input() title?: string;

  /** 数字 */
  @Input() number?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
