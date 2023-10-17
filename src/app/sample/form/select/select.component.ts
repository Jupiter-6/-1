import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'im-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'Select',
      type: 'select',
      templateOptions: {
        label: '选择器',
        placeholder: '请选择',
        description: '这是一个选择器',
        required: true,
        options: [
          { value: 1, label: '选项一' },
          { value: 2, label: '选项二' },
          { value: 3, label: '选项三' },
          { value: 4, label: '选项四', disabled: true },
        ],
      },
    },
    {
      key: 'select_multi',
      type: 'select',
      templateOptions: {
        label: '多项选择器',
        placeholder: 'Placeholder',
        description: '这是一个多项选择器',
        required: true,
        multiple: true,
        selectAllOption: 'Select All',
        options: [
          { value: 1, label: '选项一' },
          { value: 2, label: '选项二' },
          { value: 3, label: '选项三' },
          { value: 4, label: '选项四', disabled: true },
        ],
      },
    },
  ];

  onSubmit(model: any) {
    console.log(model);
  }

}
