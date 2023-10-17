import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'im-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  model = { email: '1639501830@qq.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: '邮箱地址',
        placeholder: '输入邮箱地址',
        required: true,
      }
    },
    {
      key: 'textarea',
      type: 'textarea',
      templateOptions: {
        label: '多行文本输入框',
        placeholder: '请输入',
        description: '输入你的文本',
        required: false,
        rows:5
      },
    },
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}
