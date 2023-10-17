import { Component, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DmaListService } from '../dma-list/dma-list.service';
import { HousevalueEntity } from '@shared/entities/monitoring.type';
@Component({
  selector: 'im-dma-house',
  templateUrl: './dma-house.component.html',
  styleUrls: ['./dma-house.component.scss']
})
export class DmaHouseComponent implements OnInit {

  /** 标题,从路由参数中获取 */
  title = '';

  /** 本页是否有数据 */
  hasdata = false;

  /** 加载中 */
  loading = false;

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

  /** 列表数据 */
  itemList: any = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private service: DmaListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.title = this.activatedRouter.snapshot.params.name;
    // console.log(this.activatedRouter.snapshot.params.nodepath);
    this.legendItems = Object.values(this.legend);
    this.queryList();
  }

  /** 查询表格数据 */
  queryList(): void {
    this.loading = true;
    this.itemList = [];
    const dmanodes = this.activatedRouter.snapshot.params.nodepath;
    const params = {
      criteria: [
        { name: 'pareacls', value1: 0 },
        { name: 'enable', value1: 1 },
        { name: 'dmanodes', value1: dmanodes },
      ],
      // todo: app目前只能显示30条
      pager: { pageNumber: 1, pageSize: 9999 }
    };
    this.service.queryforsearch(params).then(async (datas) => {
      this.loading = false;
      this.hasdata = datas.length > 0;
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
      this.itemList = await this.service.queryFavorite(this.itemList);
      // console.log(this.itemList);
    });
  }

  /** 搜索框查询 */
  search(text: string): void {
    this.itemList = [];
    if (!text) {
      this.queryList();
      return;
    }
    this.loading = true;
    const params = {
      pager: { pageNumber: 1, pageSize: 99 },
      criteria: [
        { name: 'enable', value1: 1 },
        { name: 'name', value1: text },
      ]
    };
    this.service.queryforsearch(params).then((datas) => {
      // console.log('data = ', datas);
      this.loading = false;
      this.hasdata = datas.length > 0;
      const list: any = [];
      datas.forEach((data: any) => {
        list.push({
          name: data.name,
          houseid: data.houseid,
          housename: data.house_name,
          pareaid: data.pareaid,
          SXYW: data.SXYW?.value?.toFixed(2),
          tanklevelstatus: this.legend['status' + data.SXYW?.status]?.color,
          JSGDYL: data.JSGDYL?.value?.toFixed(2),
          pinstatus: this.legend['status' + data.JSGDYL?.status]?.color,
          YLBYL: data.YLBYL?.value?.toFixed(2),
          poutstatus: this.legend['status' + data.YLBYL?.status]?.color,
        });
      });
      // console.log('this.itemList = ', this.itemList);
      this.itemList = this.groupByHouse(list);
    });
  }

  /** 泵房点击 */
  houseClick(house: any): void {
    // console.log(house);
    this.router.navigate([`/monitoring/house-runing/${house.houseid}`]);
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
            favorite: true
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
