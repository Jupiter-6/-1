import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { RealtimeService } from './realtime.service';
import { objToOptions } from '@shared/utils/objToOptions';
export function getFields(
    status: string,
    item: any,
    itsysApiService: ItsysApiService,
    model?: any
): FormlyFieldConfig[] {
    const Fields: FormlyFieldConfig[] = [
        {
            key: '_ctime',
            type: 'date-picker',
            wrappers: ['form-field'],
            defaultValue: new Date(),
            templateOptions: {
                label: '上传时间',
                placeholder: status === 'edit' ? '请选择时间' : '',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'cvalue',
            type: 'input',
            wrappers: ['form-field'],
            templateOptions: {
                label: '当前值',
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'alarmlevel',
            type: 'input',
            templateOptions: {
                label: '报警级别',
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return false;
            }
        },
        {
            key: 'times',
            type: 'input',
            templateOptions: {
                label: '刷新次数',
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return false;
            }
        },
        {
            key: '_stime',
            type: 'date-picker',
            wrappers: ['form-field'],
            templateOptions: {
                label: '开始时间',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: '_stime',
            type: 'date-picker',
            wrappers: ['form-field'],
            templateOptions: {
                label: '报警确认时间',
                withTimepicker: true,
                dateInputFormat: 'YYYY-MM-DD HH:mm',
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'confirmed',
            type: 'select',
            templateOptions: {
                label: '确认标志',
                options: [
                    { label: '未确认', value: 0 },
                    { label: '已自动确认', value: 1 },
                    { label: '已人工确认', value: 2 },
                    { label: '沉默', value: 3 },
                ],
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return false;
            }
        },
        {
            key: 'confirmer',
            type: 'select',
            templateOptions: {
                label: '确认人',
                options: new Observable(sub => {
                    itsysApiService.getUsers().then((list) => {
                        const res = Object.keys(list).map(i => ({
                            value: i, label: list[i].username
                        }));
                        sub.next(res);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
    ];
    return Fields;
}
export function getOrderFields(
    status: string,
    item: any,
    service: RealtimeService,
    itsysApiService: ItsysApiService,
    model?: any
): FormlyFieldConfig[] {
    const Fields: FormlyFieldConfig[] = [
        {
            key: 'houseid',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '泵房',
                placeholder: status === 'edit' ? '请选择泵房' : '',
                required: true,
                disabled: true,
                options: new Observable(sub => {
                    service.getHouseList().then((list) => {
                        sub.next(list);
                    });
                }),
                change: (event: any) => {
                    event.parent.model.parea = null;
                    event.parent.formControl.reset(event.parent.model);
                    // 更改泵区options
                    const pareaField = event.parent.fieldGroup.find((i: any) => i.key === 'pareaid');
                    const houseid = event.model.houseid;
                    service.getPareaList(houseid).then((list) => {
                        pareaField.templateOptions.options = list;
                    });
                }
            },
            // expressionProperties: {
            //     'templateOptions.disabled': 'formState.disabled',
            // },
        },
        {
            key: 'pareaid',
            type: 'select',
            templateOptions: {
                label: '泵区',
                placeholder: status === 'edit' ? '请选择泵区' : '',
                required: false,
                disabled: true,
                options: model?.houseid ? new Observable(sub => {
                    service.getPareaList(model?.houseid).then((list) => {
                        sub.next(list);
                    });
                }) : [],
                change: (event: any) => {
                    event.parent.model.device = null;
                    event.parent.formControl.reset(event.parent.model);
                    // 更改设备options
                    const deviceField = event.parent.fieldGroup.find((i: any) => i.key === 'deviceid');
                    const pareaid = event.model.pareaid;
                    service.getDeviceList(pareaid).then((list) => {
                        deviceField.templateOptions.options = list;
                    });
                }
            },
            // expressionProperties: {
            //     'templateOptions.disabled': 'formState.disabled',
            // },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return !model.houseid;
            },

        },
        {
            key: 'deviceid',
            type: 'select',
            templateOptions: {
                label: '设备',
                placeholder: status === 'edit' ? '请选择设备' : '',
                required: false,
                disabled: true,
                options: model?.pareaid ? new Observable(sub => {
                    service.getDeviceList(model?.pareaid).then((list) => {
                        sub.next(list);
                    });
                }) : [],
            },
            // expressionProperties: {
            //     'templateOptions.disabled': 'formState.disabled',
            // },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return !model.houseid || !model.pareaid;
            }
        },
        {
            key: 'mtclass',
            type: 'select',
            templateOptions: {
                label: '维修分类',
                placeholder: '请选择维修分类',
                required: true,
                options: new Observable(sub => {
                    itsysApiService.getmtclass().then((list) => {
                        sub.next(list);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'failclass',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '故障分类',
                placeholder: '请选择故障分类',
                required: false,
                options: new Observable(sub => {
                    itsysApiService.getFailclassList().then((list) => {
                        list = list.map((item: any) => ({ value: item.value, label: item.label }));
                        sub.next(list);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'mtsource',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '维修来源',
                required: true,
                disabled: true,
                options: new Observable(sub => {
                    itsysApiService.getMtsource().then((list) => {
                        list = list.map((item: any) => ({ value: item.value, label: item.label }));
                        sub.next(list);
                    });
                }),
            },
        },
        {
            key: 'depart',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '维修责任部门',
                placeholder: '请选择维修责任部门',
                required: false,
                options: new Observable(sub => {
                    itsysApiService.officeQuery({}).toPromise().then((res) => {
                        res.items = res.items.map((item: any) => ({ value: item.id, label: item.name }));
                        sub.next(res.items);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'teamid',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '维修小组',
                placeholder: '请选择维修小组',
                required: true,
                options: new Observable(sub => {
                    const param = {
                        criteria: [
                            { name: 'enabled', value1: 1 },
                            { name: 'taskclass', value1: 'W' }
                        ]
                    };
                    service.queryTeam(param).then((list) => {
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
                placeholder: status === 'edit' ? '请输入' : '',
                required: true,
                rows: 5
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
    ];
    return Fields;
}
