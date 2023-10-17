import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fixed'
})
export class FixedPipe implements PipeTransform {

    transform(value: string | number, num: number): any {
        if (!!value && Number(value)) {
            return Number(value).toFixed(num);
        } else {
            return '-';
        }

    }

}
