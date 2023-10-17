import { Pipe, PipeTransform } from '@angular/core';
import { Inspection } from '@shared/entities/database.type';

@Pipe({
  name: 'expired'
})
export class ExpiredPipe implements PipeTransform {

  transform(item: Inspection): boolean {
    if (!item) {
      return false;
    }
    if (new Date().getTime() > item.plandate2) {
      return true;
    }
    if (item.status === 5) {
      return true;
    }
    return false;
  }

}
