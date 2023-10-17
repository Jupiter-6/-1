import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WatermainsService } from '@shared/services/watermains.service';

@Component({
  selector: 'im-sensor-picker',
  templateUrl: './sensor-picker.component.html',
  styleUrls: ['./sensor-picker.component.scss']
})
export class SensorPickerComponent implements OnInit {
  @Output() openChange = new EventEmitter<boolean>();
  @Output() selectSensor = new EventEmitter();
  @Input() open: boolean = false;
  @Input() searchParams: Array<{ name: string; value1: string; }> = [];
  loading: boolean = false;
  name: string = '';
  list: any[] = [];
  constructor(
    private watermainsService: WatermainsService
  ) { }

  ngOnInit(): void {
  }
  /** 打开面板 */
  openPannel() {
    document.body.style.overflow = 'hidden';
    this.open = true;
    this.openChange.next(this.open);
  }
  /** 关闭面板 */
  closePannel() {
    document.body.style.overflow = 'auto';
    this.open = false;
    this.openChange.next(this.open);
  }
  /** 重置表单 */
  reset() {
    this.name = '';
    this.search();
  }
  search() {
    this.openPannel();
    this.loading = true;
    this.list = [];
    /** 执行搜索方法 */
    const criteria = [
      { name: 'stationname', value1: this.name },
      ...this.searchParams // 拼接额外查询参数
    ]
    this.watermainsService.appqueryenabled({ criteria }).subscribe(data => {
      this.loading = false;
      this.list = data.items || [];
    })
  }
  showList() {
    if (this.list.length) {
      this.openPannel();
    } else {
      this.search();
    }
  }
  /** 阻止默认事件 */
  stopDefaultEvent(event: MouseEvent) {
    event.stopPropagation()
  }
  selectItem(item: any) {
    this.selectSensor.next(item);
    setTimeout(() => {
      this.closePannel();
    }, 100);
  }
}
