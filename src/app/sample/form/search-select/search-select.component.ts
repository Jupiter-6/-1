import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'im-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  model = {
    area1: 'zhangsan4',
    area2: 'zhangsan1',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'area1',
      type: 'search-select',
      wrappers: ['form-field'],
      templateOptions: {
        label: '搜索选择器',
        required: true,
        options: [
          { label: '北区', value: 'zhangsan1' },
          { label: '南区', value: 'zhangsan2' },
          { label: '西区', value: 'zhangsan3' },
          { label: '东区', value: 'zhangsan4' },
        ]
      }
    },
    {
      key: 'area2',
      type: 'search-select',
      wrappers: ['form-field'],
      templateOptions: {
        label: '搜索选择器，异步数据源',
        required: true,
        options: new Observable(sub => {
          setTimeout(() => {
            sub.next([
              { label: '北区', value: 'zhangsan1' },
              { label: '南区', value: 'zhangsan2' },
              { label: '西区', value: 'zhangsan3' },
              { label: '东区', value: 'zhangsan4' },
            ]);
          }, 300);
        }),
        change: (event: any) => {
          console.log(event);
        }
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model);
  }
  reset() {
    this.form.reset()
  }
}
