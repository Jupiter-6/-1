import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WatermainsService } from '@shared/services/watermains.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';

@Component({
  selector: 'im-modal-picker',
  templateUrl: './modal-picker.component.html',
  styleUrls: ['./modal-picker.component.scss']
})
export class ModalPickerComponent implements OnInit {
  @Output() onconfirm = new EventEmitter();
  titleA = '管理区域';
  titleB = '测站类型';
  open: boolean = false;
  type: number = -1;
  areas = [
    { name: '全部', value: '', checked: false },
  ];
  dataTypes = [
    { name: '全部', value: '', checked: false },
  ];
  constructor(
    private watermainsService: WatermainsService,
    private itsysApiService: ItsysApiService
  ) { }

  ngOnInit(): void {
    /** 查询区域 */
    this.watermainsService.dmaQuery({
      criteria: [
        { name: 'nodelevel', value1: 2 },
        { name: 'enabled', value1: 1 },
      ]
    }).subscribe(data => {
      data?.items.forEach((item: any) => {
        this.areas.push({
          name: item.name, value: item.id, checked: false
        })
      })
    })
    /** 查询测站类型 */
    this.itsysApiService.queryOption({
      criteria: [
        { name: 'optselectno', value1: 'sda_station.stationtype' }
      ]
    }).subscribe(data => {
      data?.items.forEach((item: any) => {
        this.dataTypes.push({
          name: item.label, value: item.value, checked: false
        })
      })
    })
  }
  /** 打开面板 */
  openPannel(type: number) {
    document.body.style.overflow = 'hidden';
    this.open = true;
    this.type = type;
  }
  /** 关闭面板 */
  closePannel() {
    document.body.style.overflow = 'auto';
    this.open = false;
  }
  /** 重置 */
  reset() {
    this.areas.forEach(i => {
      i.checked = false;
    })
    this.dataTypes.forEach(i => {
      i.checked = false;
    })
  }
  /** 确认面板 */
  confirm() {
    this.titleA = this.areas.filter(i => i.checked).map(i => i.name).toString() || '管理区域';
    this.titleB = this.dataTypes.filter(i => i.checked).map(i => i.name).toString() || '测站类型';
    if (this.titleA === '全部') {
      this.titleA += '管理区域';
    }
    if (this.titleB === '全部') {
      this.titleB += '测站类型';
    }
    const value = {
      dmaids: this.areas.filter(i => i.checked).map(i => i.value).toString() || undefined,
      stationtype: this.dataTypes.filter(i => i.checked).map(i => i.value).toString() || undefined
    }
    this.onconfirm.next(value);
    this.closePannel();
  }
  /** 阻止默认事件 */
  stopDefaultEvent(event: MouseEvent) {
    event.stopPropagation()
  }
  /** 选择区域子项 */
  selectAreaItem(item: any) {
    if (item.name === '全部') {
      if (item.checked) {
        item.checked = false;
      } else {
        this.areas.forEach(i => {
          i.checked = false;
        })
        item.checked = true;
      }
    } else {
      this.areas[0].checked = false;
      item.checked = !item.checked;
    }
  }
  /** 选择测站类型子项 */
  selectDataTypeItem(item: any) {
    this.dataTypes.forEach(i => {
      i.checked = false;
    })
    item.checked = !item.checked;
  }
}
