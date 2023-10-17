import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { DatabaseService } from '@shared/services/_database.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { HouseRuningCardService } from './house-runing-card.service';
@Component({
  selector: 'im-house-runing-card',
  templateUrl: './house-runing-card.component.html',
  styleUrls: ['./house-runing-card.component.scss']
})
export class HouseRuningCardComponent implements OnInit, OnChanges {

  /** 泵房信息 */
  @Input() item: any = {};

  /** 开泵状态数据 */
  status: {
    /** 数字 */
    content: string,
    /** 颜色 */
    color: string
  }[] = [];


  constructor(
    private service: HouseRuningCardService,
  ) { }

  ngOnInit(): void {
    // this.status = this.service.dynamicStatus(this.item);
    // this.status = this.item.pump.map((i: any) => ({
    //   content: i.hzValue,
    //   color: i.color
    // }));
    // console.log(this.status);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { item } = changes;
    if (item && item.currentValue?.pump) {
      this.status = this.item.pump.map((i: any) => ({
        content: Math.trunc(i.hzValue),
        color: i.color
      }));
      console.log('this.status = ', this.status);
    }
  }

  /** 取消收藏 */
  async favCancel(): Promise<void> {
    const res = await this.service.favCancel(this.item);
    if (res) {
      this.item = {
        ...this.item,
        favorite: 0
      };
    }
  }

  /** 添加收藏 */
  async favAdd(): Promise<void> {
    const res = await this.service.favAdd(this.item);
    if (res) {
      this.item = {
        ...this.item,
        favorite: 1
      };
    }
  }

}
