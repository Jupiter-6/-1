import { Pipe, PipeTransform } from '@angular/core';
import { InspectionItem } from '@shared/entities/database.type';

@Pipe({
  name: 'counter'
})
export class CounterPipe implements PipeTransform {

  transform(value: InspectionItem[], key?: string): number {
    if (!value) {
      return 0;
    }
    if (!value.length) {
      return 0;
    }
    let itemdones = [0];
    if (key) {
      itemdones = value.map(item => item[key] && 1 || 0)
    } else {
      itemdones = value.map(item => item.itemdone)
    }
    const sum = itemdones.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  }

}
