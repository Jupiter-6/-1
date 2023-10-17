import { Injectable } from '@angular/core';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';
import { MessageService } from '@shared/components/message/message.service';

@Injectable({
  providedIn: 'root'
})
// ------------------------------------------------------------------------
// -------------------------------暂时没有用-----------------------------------
// ------------------------------------------------------------------------
export class DmaHouseService {

  /** 主数据 */
  itemList: any = [];
  /** sensorno和link对应关系 */
  sensorno_link_map: any = {};
  /** 查询到的sensornos */
  sensornos: string[] = [];

  constructor(
    private apiService: MonitoringApiService,
    private messageService: MessageService,
  ) { }

  /** 查询表格数据 */
  async queryformonitor(params: any): Promise<any> {
    this.itemList = [];
    await this.apiService.queryformonitor(params).toPromise().then((res) => {
      console.log(res);
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.forEach((item: any) => {
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
      this.itemList = res.items;
    });
    return this.itemList;
  }
}
