import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '@shared/services/_database.service';
import { RealtimeService } from '../realtime.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'im-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  status = '';
  confirmed = '';
  confirmeds = '';


  /** 当前页 */
  currentPage = 1;

  /** 每页条数 */
  pageSize = 10;

  /** 数据总条数 */
  total = 0;

  /** 是否有下一页 */
  hasNext = false;

  loading = false;

  selectedHouse: any;



  /** 沉默1 取消沉默0 */
  silenceNum: any;


  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    public service: RealtimeService,

  ) { }

  ngOnInit(): void {
    if (this.service.init) {
      this.service.itemList = [];
      this.rangeChange(1);
      this.service.getHouseList().then(list => {
        this.service.houseOptions = [{ label: '全部', value: '' }].concat([...list]);
      });
      this.service.init = false;
    }

    // app内监听不到window.onscroll
    // window.onscroll = () => {
    //   const scrollHeight = document.documentElement.scrollHeight;
    //   const scrollTop = document.documentElement.scrollTop;
    //   const clientHeight = document.documentElement.clientHeight;
    //   if (scrollTop + clientHeight === scrollHeight) {
    //     // 滚动条滑动到底部时触发
    //     // 计算是否有下一页，有的话请求接口
    //     const pageCount = Math.ceil(this.total / this.pageSize);
    //     if (this.currentPage + 1 <= pageCount) {
    //       this.currentPage += 1;
    //       this.queryList();
    //     }
    //   }
    // };
  }

  /** 查询下一页 */
  queryNextPage(): void {
    this.currentPage += 1;
    this.queryList();
  }

  /** 查询列表数据 */
  async queryList(): Promise<void> {
    const params = {
      criteria: [
        { name: 'group', value1: 'sws', },
        // { name: 'status', value1: '1,2' }
      ],
      pager: {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
      }
    };
    if (!!this.status) {
      params.criteria.push({ name: 'status', value1: this.status });
    }
    if (!!this.confirmed) {
      params.criteria.push({ name: 'confirmed', value1: this.confirmed });
    }
    if (!!this.confirmeds) {
      params.criteria.push({ name: 'confirmeds', value1: this.confirmeds });
    }
    let idsstr = '';
    if (!!this.service.searchValue) {
      // params.criteria.push({ name: 'confirmeds', value1: this.service.searchValue });
      const params1 = {
        criteria: [
          { name: 'houseid', value1: this.service.searchValue },
        ]
      };
      await this.service.deviceQuery(params1).then((items: any) => {
        const arr = items.map((item: any) => item.id);
        if (arr.length) {
          idsstr = arr.join(',');
          params.criteria.push({ name: 'stationids', value1: idsstr });
        }
      });
    }
    this.service.queryList(params).then((res: any) => {
      res.items.forEach((item: any) => {
        if (item.confirmed === 3) {
          item.style = { color: '#ccc' };
        }
      });
      this.service.itemList.push(...res.items);
      this.total = res.pager.recordCount;
      this.currentPage = res.pager.pageNumber;
      console.log('this.itemList = ', this.service.itemList);
      // 计算是否有下一页
      const pageCount = Math.ceil(this.total / this.pageSize);
      if (this.currentPage + 1 <= pageCount) {
        this.hasNext = true;
      } else {
        this.hasNext = false;
      }
    });
  }

  /** 跳转到详情 */
  godetails(item: any): void {
    this.service.selectedItem = item;
    this.router.navigate([
      `/realtime/details/${item.id}`,
    ]);
  }

  rangeChange(num: number) {
    this.service.selectedIndex = num;
    this.status = '';
    this.confirmed = '';
    this.confirmeds = '';
    switch (num) {
      case 0:
        this.status = '1,2';
        break;
      case 1:
        this.status = '1,2';
        this.confirmed = '0';
        break;
      case 2:
        this.status = '1,2';
        this.confirmeds = '1,2';
        break;
      case 3:
        this.status = '1,2';
        this.confirmed = '3';
        break;
      case 4:
        this.status = '2';
        break;
    }
    // 重置列表和页码
    this.service.itemList = [];
    this.currentPage = 1;
    this.queryList();
  }

  submit() {
    this.service.searchValue = this.selectedHouse;
    // 重置列表和页码
    this.service.itemList = [];
    this.currentPage = 1;
    this.queryList();
  }

  pageChanged(event: PageChangedEvent): void {
    // this.page = event.page;
    setTimeout(() => {
      this.queryList();
    }, 100);
  }

  /** 页面刷新 */
  refresh(): void {
    this.rangeChange(this.service.selectedIndex);
  }


}
