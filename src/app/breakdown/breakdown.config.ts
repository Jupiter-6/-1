import { FormlyFieldConfig } from "@ngx-formly/core";
import { Breakdown } from '@shared/entities/database.type';
import { Observable } from 'rxjs';
import { BreakdownService } from './breakdown.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { objToOptions } from "@shared/utils/objToOptions";
import { eventLevelMap } from "@shared/data/inspection.data";

export function getFields(
    status: string,
    service: BreakdownService,
    itsysApiService: ItsysApiService,
    model?: Breakdown
): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [
        {
            key: 'houseid',
            type: 'select',
            wrappers: ['form-field'],
            templateOptions: {
                label: '泵房',
                placeholder: status === 'edit' ? '请选择泵房' : '',
                required: true,
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
                required: false,
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
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
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
                options: model?.pareaid ? new Observable(sub => {
                    service.getDeviceList(model?.pareaid).then((list) => {
                        sub.next(list);
                    });
                }) : [],
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
            hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) => {
                return !model.houseid || !model.pareaid;
            }
        },
        {
            key: 'eventcls',
            type: 'select',
            templateOptions: {
                label: '异常类型',
                placeholder: status === 'edit' ? '请选择异常类型' : '',
                required: true,
                options: new Observable(sub => {
                    itsysApiService.getEventclass().then((list) => {
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
                options: objToOptions(eventLevelMap)
            },
            expressionProperties: {
                'templateOptions.disabled': 'formState.disabled',
            },
        },
        {
            key: 'eventtext',
            type: 'textarea',
            templateOptions: {
                label: '现场情况描述',
                placeholder: status === 'edit' ? '请输入' : '',
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
