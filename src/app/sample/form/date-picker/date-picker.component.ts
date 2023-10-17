import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'im-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  model = {  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'date',
      type: 'date-picker',
      wrappers: ['form-field'],
      templateOptions: {
        label: '日期',
        placeholder: '请选择时间',
        required: false,
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}
