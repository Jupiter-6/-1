/** 数据库 */
export interface DataBase {
    [key: string]: {
        inspection: {
            [key: string]: Breakdown
        };
        maintenance: {
            [key: string]: Inspection
        };
        breakdown: {
            [key: string]: Maintenance
        };
        monitoring: {
            [key: string]: Monitoring
        };
        work: {
            [key: string]: Work
        };
        event: {
            [key: string]: Event
        };
    }
}
export type SubDataBase = Breakdown | Inspection | Maintenance | Maintenance;
export type SubDataBaseStr = 'inspection' | 'maintenance' | 'breakdown' | 'monitoring' | 'work' | 'event';
/** 故障 */
export interface Breakdown {
    id: string;
    houseid: string; // 泵房
    pareaid: string; // 泵区
    deviceid: string; // 设备
    eventcls: string; // 异常类型
    eventlevel: string; // 事件等级
    eventtext: string;
    [key: string]: any;
}
/** 巡检 */
export interface Inspection {
    orgid: string;
    id: string;
    /** 关键参数，巡检详情 */
    detail?: InspectionDetail;
    routeid: string;
    pdclass_name: string;
    pdclassno: string;
    name: string;
    /** 正在下载 */
    loading: boolean;
    status: number;
    plandate1: number;
    plandate2: number;
    itemcount: number;
    [key: string]: any;

}
export interface InspectionDetail {
    task: InspectionTask;
    houses: InspectionHouse[];
    devices: InspectionDevice[];
    items: InspectionItem[];
}
export interface InspectionTask {
    housecount: number;
    housedone: number;
    [key: string]: any;
}
export interface InspectionHouse {
    id: string;
    house_houseno: string;
    house_name: string;
    houseid: string;
    itemdone: number;
    itemcount: number;
    [key: string]: any;
}
export interface InspectionDevice {
    id: string;
    device_deviceno: string;
    device_pareaid: string;
    parea_name: string;
    routetask_house_id: string;
    deviceid: string;
    device_name: string;
    device_running: string;
    itemcount: number;
    itemdone: number;

    [key: string]: any;
}
export interface InspectionItem {
    id: string;
    status: number;
    routetask_device_id: string;
    vt_inputcls: 0 | 1 | 2 | 3;
    vt_options: string;
    uploadtime: number;
    [key: string]: any;
}

/** 维修 */
export interface Maintenance {
    [key: string]: any;
}
/** 泵房监控 */
export interface Monitoring {
    [key: string]: any;
}
/** 工单 */
export interface Work {
    [key: string]: any;
}
/** 事件 */
export interface Event {
    [key: string]: any;
}
/** 用户 */
export interface ImUser {
    id: string;
    /** 用户编号 */
    userno: string;
    token: string;
    orgid: string;
    name: string;
}