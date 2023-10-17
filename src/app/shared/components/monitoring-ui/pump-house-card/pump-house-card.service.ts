import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { DatabaseService } from '@shared/services/_database.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';

@Injectable({
  providedIn: 'root'
})
export class PumpHouseCardService {
  userid = this.databaseService.user.id;
  constructor(
    private databaseService: DatabaseService,
    private itsysApiService: ItsysApiService,
    private messageService: MessageService,
  ) { }

  /** 取消收藏 */
  async favCancel(item: any): Promise<boolean> {
    let result = false;
    const params = { tablename: 'sws_parea', entityid: item.entityid };
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
    const params = { tablename: 'sws_parea', entityid: item.entityid };
    await this.itsysApiService.favoriteAdd(params).toPromise().then((res: any) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      } else {
        result = true;
      }
    });
    return result;
  }
}
