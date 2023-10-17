import { FormlyFieldConfig } from "@ngx-formly/core";
import { InspectionItem } from "@shared/entities/database.type";

export interface ProjectValue {
    valuetext?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    value5?: string;
    remark?: string;
}
type FieldConfig = (data: InspectionItem) => FormlyFieldConfig[];
type DefaultValue = (data: InspectionItem) => ProjectValue;

export const generateForm: FieldConfig = (project) => {
    if (project.vt_inputcls === 0) {
        return getFields0(project);
    }
    if (project.vt_inputcls === 1) {
        return getFields1(project);
    }
    if (project.vt_inputcls === 2) {
        return getFields2(project);
    }
    if (project.vt_inputcls === 3) {
        return getFields3(project);
    }
    return []
}
/** 备注 */
function getRemark(item: InspectionItem): FormlyFieldConfig {
    const { status } = item;
    const remark: FormlyFieldConfig = {
        key: 'remark',
        type: 'textarea',
        templateOptions: {
            disabled: status !== 0,
            label: '现场备注',
            placeholder: '请输入',
            required: false,
            rows: 3
        },
    };
    return remark;
}

function getFields0(item: InspectionItem): FormlyFieldConfig[] {
    const { vt_options, vt_name, status } = item;
    const options: any[] = [];
    const strlist = vt_options.split("|");
    strlist.map((value, index) => {
        if (index % 2 === 0) {
            options.push({
                value, label: strlist[index + 1]
            })
        }
    })


    const Fields0: FormlyFieldConfig[] = [
        {
            key: 'value1',
            type: 'select',
            templateOptions: {
                disabled: status !== 0,
                label: vt_name,
                placeholder: '请选择',
                required: true,
                options
            },
        },
        { ...getRemark(item) }
    ];
    return Fields0;
}


function getFields1(item: InspectionItem): FormlyFieldConfig[] {
    const { vt_name, status } = item;
    const Fields1: FormlyFieldConfig[] = [
        {
            key: 'valuetext',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: vt_name,
                placeholder: '输入' + vt_name,
                required: true,
            }
        },
        { ...getRemark(item) }
    ];
    return Fields1;
}

function getFields2(item: InspectionItem): FormlyFieldConfig[] {
    const { vt_name, status } = item;
    const Fields2: FormlyFieldConfig[] = [
        {
            key: 'value1',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: vt_name,
                placeholder: '输入温度（℃）',
                required: true,
            }
        },
        { ...getRemark(item) }
    ];
    return Fields2;
}

function getFields3(item: InspectionItem): FormlyFieldConfig[] {
    const { vt_alarmh1, vt_alarmh2, vt_alarmh3, vt_alarmh4, vt_alarmh5, status } = item;
    const label1 = '温度(℃)';
    const label2 = '加速度(m/s^2)';
    const label3 = '速度(mm/s)';
    const label4 = '位移(mm)';
    const label5 = '频率(Hz)';
    const Fields3: FormlyFieldConfig[] = [
        {
            key: 'value1',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: label1,
                placeholder: '请输入',
                required: true,
            }
        },
        {
            key: 'value2',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: label2,
                placeholder: '请输入',
                required: true,
            }
        },
        {
            key: 'value3',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: label3,
                placeholder: '请输入',
                required: true,
            }
        },
        {
            key: 'value4',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: label4,
                placeholder: '请输入',
                required: true,
            }
        },
        {
            key: 'value5',
            type: 'input',
            templateOptions: {
                disabled: status !== 0,
                type: 'number',
                label: label5,
                placeholder: '请输入',
                required: true,
            }
        },
        { ...getRemark(item) }
    ];
    return Fields3;
}

export const getDefaultValue: DefaultValue = (data: InspectionItem) => {
    let { valuetext, value1, value2, value3, value4, value5, remark, vt_inputcls, vt_options } = data;
    /** 下拉框特殊逻辑 */
    if (vt_inputcls === 0 && !value1) {
        const strlist = vt_options.split("|");
        value1 = strlist[0];
        data.value1 = strlist[0]; // 设置默认值
    }
    return {
        valuetext,
        value1,
        value2,
        value3,
        value4,
        value5,
        remark
    }
    // return {
    //     valuetext: valuetext || '900',
    //     value1: value1 || 901,
    //     value2: value2 || 902,
    //     value3: value3 || 903,
    //     value4: value4 || 904,
    //     value5: value5 || 905,
    //     remark
    // }
}
export const getValueText = (data: ProjectValue, type: number) => {
    let { valuetext, value1, value2, value3, value4, value5 } = data;
    if (type === 0) {
        return  value1;
    }
    if (type === 2) {
        return "温度：" + value1;
    }
    if (type === 3) {
        return `温度：${value1},加速度：${value2},速度：${value3},位移：${value4},频率：${value5}`
    }
    return valuetext;
}

