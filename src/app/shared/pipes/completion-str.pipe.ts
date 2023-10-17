import { Pipe, PipeTransform } from '@angular/core';
import { InspectionHouse } from '@shared/entities/database.type';

@Pipe({
  name: 'completionStr'
})
export class CompletionStrPipe implements PipeTransform {

  transform(value: InspectionHouse, value2?: string): string {
    let str = value2 || '巡检';
    if (!value || value.itemdone === 0) {
      return '未' + str;
    }
    if (value.itemdone < value.itemcount) {
      return '部分完成';
    }
    return '已完成';
  }

}
