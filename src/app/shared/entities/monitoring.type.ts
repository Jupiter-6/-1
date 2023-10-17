/** 实时监控-泵房列表实体 */
export interface HousevalueEntity {
    /** 名称 */
    name: string;
    /** 泵房id */
    houseid: string;
    /** 水箱液位 */
    SXYW: string;
    /** 水箱液位数据状态 */
    tanklevelstatus: string;
    /** 进水压力 */
    JSGDYL: string;
    /** 进水压力数据状态 */
    pinstatus: string;
    /** 供水压力 */
    YLBYL: string;
    /** 供水压力数据状态 */
    poutstatus: string;
    /** 泵房名称 */
    housename: string;
}
/** 实时监控-泵房详情-泵房数据实体 */
export interface HouseinfoEntity {
    /** 进水压力 */
    JSGDYL: string;
    /** 进水流量 */
    JSGDSSLL: string;
    /** 供水流量 */
    FMSSLL: string;
    /**  */
    // WTVOL: string;
    /** 水箱液位 */
    SXYW: string;
    /** 水箱容量 */
    curEffcapacity: string;
}
/** 泵房坐标信息 */
export interface HouseCoordinateEntity {
    id: string;
    houseno: string;
    name: string;
    positionx: number;
    positiony: number;
    supplyprocess: number;
}