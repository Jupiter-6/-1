import { Component, Input, OnInit } from '@angular/core';
import { BiEchartsConfig } from './echarts-options';

@Component({
  selector: 'im-bi-echarts',
  templateUrl: './bi-echarts.component.html',
  styleUrls: ['./bi-echarts.component.scss']
})
export class BiEchartsComponent implements OnInit {
  @Input() list: Array<BiEchartsConfig> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
