import { FormlyFieldConfig } from "@ngx-formly/core";
import { Observable } from 'rxjs';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
export function getFields(
    status: string,
    item: any,
    itsysApiService: ItsysApiService,
    model?: any
): FormlyFieldConfig[] {
    const Fields: FormlyFieldConfig[] = [
        {
            key: 'failclass',
            type: 'select',
            templateOptions: {
                label: '故障分类',
                placeholder: status === 'edit' ? '请选择故障分类' : '',
                required: true,
                options: new Observable(sub => {
                    itsysApiService.getWorkFailclass().then((list) => {
                        sub.next(list);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'phenomenon',
            type: 'textarea',
            templateOptions: {
                label: '故障现象',
                placeholder: status === 'edit' ? '请输入故障现象' : '',
                required: true,
                rows: 5
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'summary',
            type: 'textarea',
            templateOptions: {
                label: '处理结论',
                placeholder: status === 'edit' ? '请输入处理结论' : '',
                required: true,
                rows: 5
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'bgntime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '处理开始时间',
                placeholder: status === 'edit' ? '请选择时间' : '',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
                required: true,
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'endtime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '处理结束时间',
                placeholder: status === 'edit' ? '请选择时间' : '',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
                required: true,
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'workmans',
            type: 'input',
            templateOptions: {
                label: '处理人',
                placeholder: status === 'edit' ? '输入处理人' : '',
                required: true,
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'worksigndate',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '处理签字时间',
                placeholder: status === 'edit' ? '请选择时间' : '',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
                required: true,
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        }
    ];
    return Fields;
}