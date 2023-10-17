import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'im-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends FieldType {

  constructor(
    private bsLocaleService: BsLocaleService
  ) {
    super();
    this.bsLocaleService.use('zh-cn');
  }
  get type() {
    return this.to.type || 'text';
  }

  get placeholder() {
    return this.to.placeholder || '请选择';
  }

  get showClearButton() {
    return this.to.showClearButton || false;
  }

  get withTimepicker() {
    return this.to.withTimepicker || false;
  }
  get dateInputFormat() {
    return this.to.dateInputFormat || 'YYYY-MM-DD';
  }
}
