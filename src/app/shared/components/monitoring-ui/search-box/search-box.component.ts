import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'im-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  /** 搜索内容 */
  text = '';

  /** 搜索内容变更 */
  @Output() textChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /** 按钮点击事件 */
  btnClick(): void {
    this.textChange.emit(this.text);
  }

}
