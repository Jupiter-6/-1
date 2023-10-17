import { FormlyFieldConfig } from "@ngx-formly/core";
import { Observable } from 'rxjs';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { MaintenanceService } from './maintenance.service';
export function getFields(
    status: string,
    item: any,
    itsysApiService: ItsysApiService,
    model?: any
): FormlyFieldConfig[] {
    const Fields: FormlyFieldConfig[] = [
        {
            key: 'bgntime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '维修开始时间',
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
                label: '维修结束时间',
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
            key: 'pareaid',
            type: 'select',
            templateOptions: {
                label: '泵区',
                placeholder: status === 'edit' ? '请选择泵区' : '',
                required: true,
                options: item.pareas ?
                    item.pareas.map((i: any) => ({ value: i.id, label: i.name })) :
                    [{ value: item.pareaid, label: item.parea_name || '无' }],
                change: (event: any) => { }
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return false;
            }
        },
        {
            key: 'deviceid',
            type: 'select',
            templateOptions: {
                label: '设备',
                placeholder: status === 'edit' ? '请选择设备' : '',
                required: false,
                options: item.devices ?
                    item.devices.map((i: any) => ({ value: i.id, label: i.name })) :
                    [{ value: item.deviceid, label: item.device_name || '无' }],
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return false;
            }
        },
        {
            key: 'failclass',
            type: 'select',
            templateOptions: {
                label: '故障分类',
                placeholder: status === 'edit' ? '请选择故障分类' : '',
                required: true,
                options: new Observable(sub => {
                    itsysApiService.getFailclassList().then((list) => {
                        sub.next(list);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'equip',
            type: 'select',
            templateOptions: {
                label: '设备维修',
                placeholder: status === 'edit' ? '请选择设备维修' : '',
                required: false,
                options: [
                    { value: 1, label: '是' },
                    { value: 0, label: '否' },
                ],
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'cutoff',
            type: 'select',
            templateOptions: {
                label: '停水',
                placeholder: status === 'edit' ? '请选择是否停水' : '',
                required: false,
                options: [
                    { value: 1, label: '是' },
                    { value: 0, label: '否' },
                ],
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'offbgntime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '停水开始时间',
                placeholder: status === 'edit' ? '请选择时间' : '',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
                required: true,
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: '!model.cutoff',
        },
        {
            key: 'offendtime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '停水结束时间',
                placeholder: status === 'edit' ? '请选择时间' : '',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
                required: true,
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: '!model.cutoff',
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
            key: 'analyse',
            type: 'textarea',
            templateOptions: {
                label: '故障原因',
                placeholder: status === 'edit' ? '请输入故障原因' : '',
                required: true,
                rows: 5
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'solution',
            type: 'textarea',
            templateOptions: {
                label: '解决方案',
                placeholder: status === 'edit' ? '请输入解决方案' : '',
                required: true,
                rows: 5
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'workcompany',
            type: 'select',
            templateOptions: {
                label: '维修单位',
                placeholder: status === 'edit' ? '请选择维修单位' : '',
                required: true,
                options: item.workcompanys ?
                    item.workcompanys.map((i: any) => ({ value: i, label: i })) :
                    [{ value: item.workcompany, label: item.workcompany || '无' }],
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'workmans',
            type: 'input',
            templateOptions: {
                label: '维修人员',
                placeholder: status === 'edit' ? '输入维修人员' : '',
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
                label: '维修签字时间',
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

export function getQueryFields(
    service: MaintenanceService,
    itsysApiService: ItsysApiService,
): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [
        {
            key: 'bgntime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '完成时间-始',
                placeholder: '请选择时间',
                // withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD',
                required: false,
            },
        },
        {
            key: 'endtime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '完成时间-终',
                placeholder: '请选择时间',
                // withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD',
                required: false,
            },
        },
        {
            key: 'houseid',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '泵房',
                placeholder: '请选择泵房',
                required: false,
                options: new Observable(sub => {
                    service.getHouseList().then((list) => {
                        sub.next(list);
                    });
                }),
            },
        },
        {
            key: 'failclass',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '故障分类',
                placeholder: '请选择维修分类',
                required: false,
                options: new Observable(sub => {
                    itsysApiService.getFailclassList().then((list) => {
                        list = list.map((item: any) => ({ value: item.value, label: item.label }));
                        sub.next(list);
                    });
                }),
            },
        },
        {
            key: 'mtclass',
            type: 'select',
            templateOptions: {
                label: '维修分类',
                placeholder: '请选择维修分类',
                required: false,
                options: new Observable(sub => {
                    itsysApiService.getmtclass().then((list) => {
                        sub.next(list);
                    });
                }),
            },
        },
    ];
    return fields;
}
