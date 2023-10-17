import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '@shared/components/message/message.service';
import { DmaListService } from './dma-list.service';
import { HousevalueEntity } from '@shared/entities/monitoring.type';
// import VConsole from 'vconsole';
@Component({
  selector: 'im-dma-list',
  templateUrl: './dma-list.component.html',
  styleUrls: ['./dma-list.component.scss']
})
export class DmaListComponent implements OnInit {

  /** 开启摄像头 */
  showWebcam = false;

  /** 加载中 */
  loading = false;

  /** 首次加载关注页面 */
  favInit = true;

  /** 是否查询泵房 */
  inSearch = false;

  /** 本页是否有数据 */
  // hasdata = false;

  /** 区域信息表头 */
  areaColumn: any;

  /** 区域表格数据 */
  dataList: any;

  dmaname_nodepath_map: any;

  /** 图例 */
  legendItems: any = [];
  /** 图例 */
  legend: any = {
    status1: {
      name: '正常',
      color: '#212121'
    },
    status0: {
      name: '未按时上传',
      color: '#E8E8E8'
    },
    status2: {
      name: '一级',
      color: '#ffd900'
    },
    status3: {
      name: '二级',
      color: '#FF9B59'
    },
    status4: {
      name: '三级',
      color: '#d7003a'
    },
  };

  /** 关注列表数据 */
  itemList: any = [];

  /** 通过条件查询泵房列表数据 */
  itemList1: any = [];

  constructor(
    private messageService: MessageService,
    private service: DmaListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.legendItems = Object.values(this.legend);
    this.queryAreaData();
  }

  /** 搜索框查询 */
  search(text: string): void {
    if (!text) {
      this.inSearch = false;
      this.queryAreaData();
      return;
    }
    this.itemList1 = [];
    this.inSearch = true;
    this.loading = true;
    const params = {
      pager: { pageNumber: 1, pageSize: 99 },
      criteria: [
        { name: 'enable', value1: 1 },
        { name: 'name', value1: text },
      ]
    };
    this.service.queryforsearch(params).then((datas) => {
      this.loading = false;
      // this.hasdata = datas.length > 0;
      datas.forEach((data: any) => {
        this.itemList1.push({
          name: data.name,
          houseid: data.houseid,
          housename: data.house_name,
          pareaid: data.pareaid,
          SXYW: data.SXYW?.value.toFixed(2),
          tanklevelstatus: this.legend['status' + data.SXYW?.status]?.color,
          JSGDYL: data.JSGDYL?.value.toFixed(2),
          pinstatus: this.legend['status' + data.JSGDYL?.status]?.color,
          YLBYL: data.YLBYL?.value.toFixed(2),
          poutstatus: this.legend['status' + data.YLBYL?.status]?.color,
        });
      });
    });
  }

  /** 查询区域数据 */
  async queryAreaData(): Promise<void> {
    this.loading = true;
    await this.service.queryAreaData().then((data) => {
      this.loading = false;
      if (!!data.areaColumn) {
        this.areaColumn = data.areaColumn;
        // this.hasdata = true;
      } else {
        // this.hasdata = false;
        this.messageService.show({ content: '错误', type: 'warning' });
        return;
      }
      this.dataList = data.areaData;
      this.dmaname_nodepath_map = data.dmaname_nodepath;
      // this.hasdata = this.dataList.length > 0;
    });
  }

  /** 点击区域信息 */
  areaClick(item: any): void {
    const path = this.dmaname_nodepath_map[item.area] || '';
    if (path) {
      this.router.navigate([
        `/monitoring/dma-houses`,
        { nodepath: path, name: item.area },
      ]);
    }
  }

  /** 首次加载关注页面 */
  selectTab(): void {
    if (!this.favInit) {
      return;
    }
    this.favInit = false;
    this.loading = true;
    this.itemList = [];
    const params = {
      criteria: [
        { name: 'enable', value1: 1 },
        { name: 'myfavorite', value1: 1 },
      ]
    };
    this.service.queryforsearch(params).then((datas) => {
      this.loading = false;
      // this.hasdata = datas.length > 0;
      const list: any = [];
      datas.forEach((data: any) => {
        list.push({
          name: data.name,
          houseid: data.houseid,
          housename: data.house_name,
          pareaid: data.pareaid,
          SXYW: data.SXYW?.value.toFixed(2),
          tanklevelstatus: this.legend['status' + data.SXYW?.status]?.color,
          JSGDYL: data.JSGDYL?.value.toFixed(2),
          pinstatus: this.legend['status' + data.JSGDYL?.status]?.color,
          YLBYL: data.YLBYL?.value.toFixed(2),
          poutstatus: this.legend['status' + data.YLBYL?.status]?.color,
        });
      });
      this.itemList = this.groupByHouse(list);
    });
  }

  /** 泵房点击 */
  houseClick(house: any): void {
    this.router.navigate([
      `/monitoring/house-runing/${house.houseid}`
    ]);
  }

  /** 开启摄像头 */
  startCamera(): void {
    if ((window as any)?.javaobj) {
      (window as any)?.javaobj?.myscan();
      (window as any).passParam = (res: any) => {
        this.onSeclected(res);
      };
    }

  }

  /** 扫描到内容触发事件 */
  onSeclected(str: string): void {
    // this.messageService.show({ content: `扫描到内容为${str}`, type: 'info' });
    if (str.startsWith('sws_H_') && str !== 'sws_H_') {
      const params = {
        criteria: [{ name: 'houseno', value1: str.replace('sws_H_', '') }]
      };
      this.service.queryHouse(params).then((id) => {
        if (!!id) {
          this.router.navigate([
            `/monitoring/house-runing/${id}`
          ]);
        } else {
          this.messageService.show({ content: `没有该泵房信息 ${str}`, type: 'warning' });
        }
      });
    } else {
      this.messageService.show({ content: `没有该泵房信息 ${str}`, type: 'warning' });
    }
  }

  /** 根据泵房分组 */
  groupByHouse(list: any) {
    const obj: any = {};
    list.forEach((data: any) => {
      if (!obj[data.houseid]) {
        obj[data.houseid] = {
          house: {
            houseid: data.houseid,
            housename: data.housename,
          },
          parea: [],
        };
      }
      obj[data.houseid].parea.push(data);
    });
    const datas = Object.values(obj);
    // console.log(datas);
    return datas;
  }

}
