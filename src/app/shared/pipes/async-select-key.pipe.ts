import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asyncSelectKey',
})
export class AsyncSelectKeyPipe implements PipeTransform {
  transform(object: any, key?: any): any {
    if (!object) { return object; }
    return object[key] || '';
  }
}
