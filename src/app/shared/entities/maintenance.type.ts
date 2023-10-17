/** 维修-上传实体 */
export interface UploadingEntity {
    /** 编码 */
    code: string;
    /** 泵房名称 */
    name: string;
    /** 故障现象 */
    detail: string;
    /** 维修结论 */
    conclusion: string;
    /** 来源 */
    source: string;
    /** 发布日期 */
    time: string;
}

/** 配件 */
export interface MaintenancePart {
    /** 名称 */
    partname?: string;
    /** 单位 */
    unitname?: string;
    /** 数量 */
    quantity?: number;
    /** 备注 */
    remark?: string;
    itemid?: string;
}