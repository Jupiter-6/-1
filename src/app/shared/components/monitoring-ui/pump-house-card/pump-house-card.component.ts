import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PumpHouseCardService } from './pump-house-card.service';
@Component({
  selector: 'im-pump-house-card',
  templateUrl: './pump-house-card.component.html',
  styleUrls: ['./pump-house-card.component.scss']
})
export class PumpHouseCardComponent implements OnInit {

  /** 列表数据 */
  @Input() houseList?= [];

  /** 显示收藏 */
  @Input() displayFav?= false;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: PumpHouseCardService,
  ) { }


  ngOnInit(): void {
  }

  cardClick(item: any): void {
    this.selectedChange.emit(item);
  }

  /** 取消收藏 */
  async favCancel(item: any): Promise<void> {
    const promises: Promise<any>[] = [];
    item.parea.forEach((parea: any) => {
      const params = { tablename: 'sws_parea', entityid: parea.pareaid };
      promises.push(this.service.favCancel(params));
    });
    const res = await Promise.all(promises);
    if (!res.includes(false)) {
      item.house.favorite = false;
    }
    // const res = await this.service.favCancel(item);
    // if (res) {
    //   item = {
    //     ...item,
    //     favorite: false
    //   };
    // }
  }

  /** 添加收藏 */
  async favAdd(item: any): Promise<any> {
    const promises: Promise<any>[] = [];
    item.parea.forEach((parea: any) => {
      const params = { tablename: 'sws_parea', entityid: parea.pareaid };
      promises.push(this.service.favAdd(params));
    });
    const res = await Promise.all(promises);
    if (!res.includes(false)) {
      item.house.favorite = true;
    }
    // const res = await this.service.favAdd(item);
    // if (res) {
    //   item = {
    //     ...item,
    //     favorite: true
    //   };
    // }
  }

}
