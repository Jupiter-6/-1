import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: number | string, pattern: string): string {
    let result = '';
    if (!!value) {
      result = format(new Date(value).getTime(), pattern || 'yyyy-MM-dd HH:mm:ss');
    }
    return result;
  }

}
