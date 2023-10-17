import { FormlyFieldConfig } from "@ngx-formly/core";
import { eventLevelMap } from "@shared/data/inspection.data";
import { InspectionDevice, InspectionHouse } from "@shared/entities/database.type";
import { ItsysApiService } from "@shared/services/_itsys-api.service";
import { objToOptions } from "@shared/utils/objToOptions";
import { Observable } from "rxjs";

export const getFields = (api: ItsysApiService, house?: InspectionHouse, device?: InspectionDevice) => {

    const Fields: FormlyFieldConfig[] = [
        {
            key: 'houseid',
            type: 'select',
            templateOptions: {
                label: '泵房',
                placeholder: '请选择泵房',
                required: true,
                options: [
                    { value: house?.houseid, label: house?.house_name },
                ],
                disabled: true
            },
        },
        {
            key: 'pareaid',
            type: 'select',
            templateOptions: {
                label: '泵区',
                placeholder: '请选择泵区',
                required: false,
                options: [
                    { value: device?.device_pareaid, label: device?.parea_name },
                ],
                disabled: true
            },
        },
        {
            key: 'deviceid',
            type: 'select',
            templateOptions: {
                label: '设备',
                placeholder: '请选择设备',
                required: false,
                options: [
                    { value: device?.deviceid, label: device?.device_name },
                ],
                disabled: true
            },
        },
        {
            key: 'eventcls',
            type: 'select',
            templateOptions: {
                label: '异常类型',
                placeholder: '请选择异常类型',
                required: true,
                options: new Observable(sub => {
                    api.getEventclass().then((list) => {
                        sub.next(list);
                    });
                }),
            },
        },
        {
            key: 'eventlevel',
            type: 'select',
            templateOptions: {
                label: '事件等级',
                placeholder: '请选择事件等级',
                required: true,
                options: objToOptions(eventLevelMap)
            },
        },
        {
            key: 'eventtext',
            type: 'textarea',
            templateOptions: {
                label: '现场情况描述',
                placeholder: '请输入',
                required: true,
                rows: 5
            },
        },
    ]
    return Fields;
}

