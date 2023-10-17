import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { format } from 'date-fns';

/** 维修任务状态字典 */
export const MaintenanceStatusMap: { [key: string]: { desc: string } } = {
  0: { desc: '未发布' },
  1: { desc: '已发布' },
  2: { desc: '已下载' },
  3: { desc: '已完成' },
  8: { desc: '已审核' },
  9: { desc: '已取消' },
};

/** 任务状态字典 */
export const StatusMap: { [key: string]: { desc: string; color: string } } = {
  0: { desc: '未发布', color: '#212121' },
  1: { desc: '已发布', color: '#212121' },
  2: { desc: '已下载', color: '#212121' },
  5: { desc: '完成', color: 'green' },
  8: { desc: '审核', color: '#212121' },
  9: { desc: '取消', color: 'gray' },
};

/** 运维项 */
export interface OpsClass {
  label: string;
  value: string;
}
/** 运维列表 */
export const OpsClassList: Array<OpsClass> = [
  { label: '全部', value: '' },
  { label: '泵房巡检', value: 'BZXJ' },
  { label: '水质快检', value: 'szjc' },
  { label: '水质详检', value: 'BDDR' },
  { label: '水箱清洗', value: 'sxqx' },
  { label: '维护保养', value: 'WHBY' },
  { label: '维修历史', value: 'history' },
];
/** 分类字典 */
export const OpsClassMap: { [key: string]: string } = {};
OpsClassList.map((item) => {
  OpsClassMap[item.value] = item.label;
});

@Injectable({
  providedIn: 'root'
})

export class InspectionRecordsService {

  constructor(
    private apiService: MonitoringApiService,
    private itsysApiService: ItsysApiService,
    private messageService: MessageService,
  ) { }

  /** 查询泵房巡检 */
  async queryBFXJ(params: any): Promise<any> {
    const result: any = [];
    await this.apiService.itemtaskQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items?.forEach((item: any) => {
        const tmp = {
          date: this.getBFXJTime(item),
          person: '-',
        };
        result.push(tmp);
      });
    });
    this.itsysApiService.getUsers().then((personmap) => {
      result.forEach((item: any) => {
        item.person = personmap[item.person].username || '-';
      });
    });
    return result;
  }

  /** 查询所有泵房任务 */
  async queryall(params: any): Promise<any> {
    const result: any = [];
    await this.apiService.housetaskQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.forEach((item: any) => {
        const tmp = {
          date: format(item.donetime || item.modifytime, 'yyyy-MM-dd HH:mm'),
          type: OpsClassMap[item.pdclassno] || item.pdclassno,
          person: item.person,
          status: StatusMap[item.status]?.desc || '-',
          statusColor: StatusMap[item.status]?.color || '#212121',
        };
        result.push(tmp);
      });
    });
    await this.itsysApiService.getUsers().then((personmap) => {
      result.forEach((item: any) => {
        item.person = personmap[item.person].username || '-';
      });
    });
    return result;
  }

  getBFXJTime(item: any): string {
    if (item.donetime) {
      return format(item.donetime, 'yyyy-MM-dd HH:mm');
    } else {
      const time = format(item.modifytime, 'yyyy-MM-dd HH:mm');
      const status = StatusMap[item.status]?.desc || '-';
      return `${time} (${status})`;
    }
  }

  /** 查询水质快检 */
  async querySZKJ(params: any): Promise<any> {
    let result: any = [];
    await this.apiService.itemtaskQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      const dataMap: {
        [key: string]: { [key: string]: any };
      } = {};
      // 数据分类汇总
      res.items?.forEach((item: any) => {
        if (!dataMap[item.id]) {
          dataMap[item.id] = {};
        }
        dataMap[item.id][item.periodicItemEntity.itemno] =
          item;
      });
      // 数据处理
      const data: Array<{
        NTU: number;
        YUL: number;
        person: string;
        time: string;
        status: number;
      }> = [];
      for (const item of Object.values(dataMap)) {
        data.push({
          NTU: +item['NTU']?.value1,
          YUL: +item['YUL']?.value1,
          person:
            item['NTU']?.person ||
            item['YUL']?.person,
          time:
            this.getSZKJTime(
              item['YUL']?.modifytime ||
              item['NTU']?.modifytime
            ),
          status:
            item['NTU']?.status ||
            item['YUL']?.status,
        });
      }
      result = data;
    });
    this.itsysApiService.getUsers().then((personmap) => {
      result.forEach((item: any) => {
        item.person = personmap[item.person].username || '-';
      });
    });
    return result;
  }

  getSZKJTime(item: any): string {
    const time = format(item, 'yyyy-MM-dd HH:mm');
    const status = StatusMap[item.status]?.desc || '-';
    return `${time} (${status})`;
  }

  /** 查询水质详检 */
  async querySZXJ(params: any): Promise<any> {
    const data: any[] = [];
    await this.apiService.formrowQuerywithdata(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items?.forEach((item: any) => {
        item.formItemList.forEach((form: any) => {
          item[form.itemno] = form.tvalue;
        });
        data.push({
          date: format(item.rowdate, 'yyyy-MM-dd HH:mm'),
          HYL: item['XJHYL'],
          JLZS: item['XJJLZS'],
          zhuodu: item['XJRJD'],
          yulv: item['XJYLYL'],
        });
      });
    });
    return data;
  }

  /** 查询水箱清洗、维护保养 */
  async querySXQX(params: any): Promise<any> {
    const result: any = [];
    await this.apiService.housetaskQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items?.forEach((item: any) => {
        const tmp = {
          date: this.getBFXJTime(item),
          person: item.person,
        };
        result.push(tmp);
      });
    });
    this.itsysApiService.getUsers().then((personmap) => {
      result.forEach((item: any) => {
        item.person = personmap[item.person].username || '-';
      });
    });
    return result;
  }

  getSXQXTime(item: any): string {
    if (item.donetime) {
      return format(item.donetime, 'yyyy-MM-dd HH:mm');
    } else {
      const time = format(item.modifytime, 'yyyy-MM-dd HH:mm');
      const status = StatusMap[item.status]?.desc || '-';
      return `${time} (${status})`;
    }
  }

  /** 查询维修历史 */
  async queryWXLS(params: any): Promise<any> {
    const data: any = [];
    await this.apiService.maintenanceQuery(params).toPromise().then(async (res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      const [personMap, failclassMap] = await Promise.all([
        this.itsysApiService.getUsers(),
        this.itsysApiService.getFailclass()
      ]);
      res.items?.forEach((item: any) => {
        const result = {
          person: personMap[item.person].username || '-',
          failclass: failclassMap[item.failclass] || '-',
          status: MaintenanceStatusMap[item.status].desc,
          date: '',
        };
        if (item.status === 0) {
          result.date = format(item.createtime, 'yyyy-MM-dd HH:mm');
        } else if (item.status === 1) {
          result.date =
            (item.pubtime &&
              format(item.pubtime, 'yyyy-MM-dd HH:mm')) ||
            '-';
        } else if (item.status === 2) {
          result.date =
            (item.downtime &&
              format(item.downtime, 'yyyy-MM-dd HH:mm')) ||
            '-';
        } else {
          result.date =
            (item.entertime &&
              format(item.entertime, 'yyyy-MM-dd HH:mm')) ||
            '-';
        }
        data.push(result);
      });
    });
    return data;
  }
}
