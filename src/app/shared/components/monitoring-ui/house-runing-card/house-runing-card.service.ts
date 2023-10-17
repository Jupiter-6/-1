import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { DatabaseService } from '@shared/services/_database.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class HouseRuningCardService {

  userid = this.databaseService.user.id;

  constructor(
    private databaseService: DatabaseService,
    private itsysApiService: ItsysApiService,
    private messageService: MessageService,
  ) { }

  /** 取消收藏 */
  async favCancel(item: any): Promise<boolean> {
    let result = false;
    const params = { tablename: 'sws_parea', entityid: item.id };
    await this.itsysApiService.favoriteCancel(params).toPromise().then((res: any) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      } else {
        result = true;
      }
    });
    return result;
  }

  /** 添加收藏 */
  async favAdd(item: any): Promise<boolean> {
    let result = false;
    const params = { tablename: 'sws_parea', entityid: item.id };
    await this.itsysApiService.favoriteAdd(params).toPromise().then((res: any) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      } else {
        result = true;
      }
    });
    return result;
  }

  /** 处理开泵状态信息 */
  dynamicStatus(item: any): any {
    const status: any = [];

    if (item.PUMPOPEN) {
      if (item.BJYXPL) {
        let PUMPFREQArray: any = [];
        if (item.BJYXPL.indexOf(',') !== -1) {
          PUMPFREQArray = item.BJYXPL.split(',');
        } else {
          PUMPFREQArray.push(item.BJYXPL);
        }

        item.PUMPOPEN.forEach((value: any, index: any) => {
          if (value.value > 0.9 && !value.timeout) {// 开泵
            if (PUMPFREQArray[index]) {// 变频
              status.push({
                content: index + 1,
                class: 'pump_run'
              });
            } else {
              status.push({
                content: index + 1,
                class: 'pump_run2'
              });
            }
          } else {
            if (PUMPFREQArray[index]) {
              status.push({
                content: index + 1,
                class: 'pump_stop'
              });
            } else {
              status.push({
                content: index + 1,
                class: 'pump_stop2'
              });
            }
          }
        });
      } else {
        item.PUMPOPEN.forEach((value: any, index: any) => {
          status.push({
            content: index + 1,
            class: (value.value > 0.9 && !value.timeout) ? 'bgc_00AD3D' : 'bgc_E8E8E8'
          });
        });
      }
    }
    return status;
  }
}
