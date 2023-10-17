import { Pipe, PipeTransform } from '@angular/core';
import { Inspection } from '@shared/entities/database.type';

@Pipe({
  name: 'expiredStr'
})
export class ExpiredStrPipe implements PipeTransform {
  //status 0-新增 1-发布 2-下载 5-完成 8-审核 9-取消
  transform(item: Inspection): string {
    if (!item) {
      return '';
    }
    if (item.status === 5) {
      return '任务已完成';
    }
    if (new Date().getTime() > item.plandate2) {
      return '任务已过期';
    }
    const oneDay = 1000 * 60 * 60 * 24;
    if (new Date().getTime() + oneDay > item.plandate2) {
      return '任务即将过期，请及时处理';
    }

    return '';
  }

}
