import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { DatabaseService } from '@shared/services/_database.service';

@Injectable({
  providedIn: 'root'
})
export class DmaListService {
  /** 查询到的sensornos */
  sensornos: string[] = [];
  /** sensorno和link对应关系 */
  sensorno_link_map: any = {};
  /** 通过条件查询到的主数据 */
  searchDatas = [];
  /** 区域表头信息 */
  areaColumnData = [];
  /** 区域信息主数据 */
  areaDatas = [];

  constructor(
    private apiService: MonitoringApiService,
    private sdaApiService: SdaApiService,
    private itsysApiService: ItsysApiService,
    private messageService: MessageService,
    private databaseService: DatabaseService,
  ) { }

  /** 搜索框查询 */
  async queryforsearch(params: any): Promise<any> {
    this.sensornos = [];
    this.sensorno_link_map = {};
    this.searchDatas = [];
    // 查询主数据
    await this.apiService.queryformonitor(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      // 保存sensorno和对应的link
      res.items.map((item: any) => {
        item.sensorlinks.map((link: any) => {
          if (link.classno === 'SXYW' || link.classno === 'JSGDYL' || link.classno === 'YLBYL') {
            let sensornos = link.sensorno.split(',');
            sensornos = sensornos.filter((value: string) => !!value);
            sensornos.forEach((no: string) => {
              this.sensorno_link_map[no] = link;
              this.sensornos.push(no);
            });
          }
        });
      });
      this.searchDatas = res.items;
    });
    if (this.searchDatas.length !== 0) {
      await this.queryLastValue();
    }
    // console.log('this.searchDatas = ', this.searchDatas);
    return this.searchDatas;
  }

  /** 查询数值 */
  async queryLastValue(): Promise<void> {
    if (this.sensornos.length === 0) {
      this.messageService.show({ content: '没有传感器', type: 'warning' });
      return;
    }
    const sensornosStr = this.sensornos.join(',');
    const params = [{
      name: 'sensornos',
      value1: sensornosStr
    }];
    await this.sdaApiService.queryLastvalue({ criteria: params }).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      // res.items.forEach((sensor: any) => {
      //   const mapitem = this.sensorno_link_map[sensor.sensorno];
      //   let item: any = null;
      //   if (!mapitem) { return; } else {
      //     item = this.searchDatas.find((data: any) => data.pareaid === mapitem.ownerid || data.houseid === mapitem.ownerid);
      //   }
      //   if (!item) { return; } else {
      //     switch (mapitem.classno) {
      //       case 'SXYW':
      //         item.SXYW = sensor;
      //         break;
      //       case 'JSGDYL':
      //         item.JSGDYL = sensor;
      //         break;
      //       case 'YLBYL':
      //         item.YLBYL = sensor;
      //         break;
      //     }
      //   }
      // });
      this.searchDatas.forEach((data: any) => {
        res.items.forEach((sensor: any) => {
          const mapitem = this.sensorno_link_map[sensor.sensorno];
          if (!mapitem) { return; }
          if (data.houseid === mapitem.ownerid || data.pareaid === mapitem.ownerid) {
            switch (mapitem.classno) {
              case 'SXYW':
                data.SXYW = sensor;
                break;
              case 'JSGDYL':
                data.JSGDYL = sensor;
                break;
              case 'YLBYL':
                data.YLBYL = sensor;
                break;
            }
          }


        });
      });
    });
  }

  /** 查询区域信息 */
  async queryAreaData(): Promise<any> {
    const params = {
      criteria: [
        { name: 'optselectno', value1: 'sws_parea.boostgear' },
        { name: 'enabled', value1: 1 }
      ]
    };
    let [coldata, countdata] = await Promise.all([
      this.itsysApiService.queryOption(params).toPromise(),
      this.apiService.countByDmaAndBoost({}).toPromise()
    ]);
    if (coldata.code !== '0' || countdata.code !== '0') {
      this.messageService.show({ content: '错误', type: 'danger' });
      return;
    }
    coldata = coldata.items;
    countdata = countdata.items;
    // 表头数据信息处理
    this.areaColumnData = coldata.sort((a: any, b: any) => {
      return a.value - b.value;
    });
    // 表格内容信息处理
    const areaMap: any = {};
    countdata = countdata.filter((item: any) => !!item.boostgear);
    countdata.forEach((item: any) => {
      let areaItem: any = null;
      if (areaMap[item.dma_id]) {
        areaItem = areaMap[item.dma_id];
      } else {
        areaItem = {
          dma_id: item.dma_id,
          dma_nodepath: item.dma_nodepath,
          dma_name: item.dma_name
        };
        areaItem.value = [];
        for (let index = 0; index < this.areaColumnData.length; index++) {
          areaItem.value[index] = 0;
        }
        areaMap[areaItem.dma_id] = areaItem;
      }
      const boostgear = parseInt(item.boostgear);
      areaItem.value[boostgear - 1] = item.parea_count;
    });
    const areaData: any = [];
    Object.values(areaMap).forEach((value) => {
      areaData.push(value);
    });
    this.areaDatas = areaData;
    // 格式化数据
    const key_title: any = { area: '区域' };
    this.areaColumnData.forEach((data: any) => {
      key_title['boostgear' + data.value] = data.label;
    });
    const itemList: any = [];
    const name_path_map: any = {};
    this.areaDatas.forEach((data: any) => {
      name_path_map[data.dma_name] = data.dma_nodepath;
      const item: any = {};
      item.area = data.dma_name;
      data.value.forEach((value: any, index: any) => {
        item['boostgear' + (index + 1)] = value;
      });
      itemList.push(item);
    });
    return { areaColumn: key_title, areaData: itemList, dmaname_nodepath: name_path_map };
  }

  /** 查询泵房 */
  async queryHouse(params: any): Promise<string> {
    let result = '';
    await this.apiService.queryHouse(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      if (res.items.length > 0) {
        result = res.items[0].id;
      }
    });
    return result;
  }

  /**
   * 查询收藏
   */
  async queryFavorite(houseItems: any): Promise<void> {
    const userid = this.databaseService.user.id;
    const params = {
      criteria: [
        { name: 'userid', value1: userid },
        { name: 'tablename', value1: 'sws_parea' }
      ]
    };
    await this.itsysApiService.favoriteQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }

      houseItems.forEach((house: any) => {
        house.parea.forEach((parea: any) => {
          const item = res.items.find((favorite: any) => favorite.entityid === parea.pareaid);
          if (!item) {
            house.house.favorite = false;
          }
        });
      });
    });
    return houseItems;
  }

}
