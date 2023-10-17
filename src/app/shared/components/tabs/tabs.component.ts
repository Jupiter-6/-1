import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from './tabs.type';

@Component({
  selector: 'im-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  // tabs数据
  @Input() tabs?: Tab[];
  @Output() OnSelectOut = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
  onSelect(item: Tab) {
    this.OnSelectOut.emit(item);
  }
}
