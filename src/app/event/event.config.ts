import { FormlyFieldConfig } from '@ngx-formly/core';
import { Breakdown } from '@shared/entities/database.type';
import { Observable } from 'rxjs';
import { EventService } from './event.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { objToOptions } from '@shared/utils/objToOptions';
import { eventLevelMap } from '@shared/data/inspection.data';

export function getFields(
    status: string,
    service: EventService,
    itsysApiService: ItsysApiService,
    model?: any
): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [
        {
            key: 'dmaid',
            type: 'search-select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '分区',
                placeholder: status === 'edit' ? '请选择分区' : '',
                required: true,
                typeaheadOptionsLimit: 150,
                options: new Observable(sub => {
                    service.getDmaList().then((list) => {
                        sub.next(list);
                    });
                }),
                change: (event: any) => {
                    event.parent.model.factoryid = null;
                    event.parent.formControl.reset(event.parent.model);
                    // 更改站点options
                    const factoryidField = event.parent.fieldGroup.find((i: any) => i.key === 'factoryid');
                    const dmaid = event.model.dmaid;
                    service.getFactoryList(dmaid).then((list) => {
                        factoryidField.templateOptions.options = list;
                    });
                }
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'factoryid',
            type: 'select',
            templateOptions: {
                label: '站点',
                placeholder: status === 'edit' ? '请选择站点' : '',
                required: true,
                options: model?.dmaid ? new Observable(sub => {
                    service.getFactoryList(model?.dmaid).then((list) => {
                        sub.next(list);
                    });
                }) : [],
                // change: (event: any) => {
                //     event.parent.model.device = null;
                //     event.parent.formControl.reset(event.parent.model);
                //     // 更改设备options
                //     const deviceField = event.parent.fieldGroup.find((i: any) => i.key === 'deviceid');
                //     const pareaid = event.model.pareaid;
                //     service.getDeviceList(pareaid).then((list) => {
                //         deviceField.templateOptions.options = list;
                //     });
                // }
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return !model.dmaid;
            },

        },
        {
            key: 'eventcls',
            type: 'select',
            templateOptions: {
                label: '异常类型',
                placeholder: status === 'edit' ? '请选择异常类型' : '',
                required: false,
                options: new Observable(sub => {
                    itsysApiService.getSdaEventclass().then((list) => {
                        sub.next(list);
                    });
                }),
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'eventlevel',
            type: 'select',
            templateOptions: {
                label: '事件等级',
                placeholder: status === 'edit' ? '请选择事件等级' : '',
                required: true,
                options: [
                    { label: '1级黄色', value: 1 },
                    { label: '2级橙色', value: 2 },
                    { label: '3级红色', value: 3 },
                ]
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'eventtext',
            type: 'textarea',
            templateOptions: {
                label: '事件内容',
                placeholder: status === 'edit' ? '请输入事件内容' : '',
                required: true,
                rows: 5
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
    ];
    return fields;
}
