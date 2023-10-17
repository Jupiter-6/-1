import { environment } from "@env/environment";
import { AccordionGroup } from "../entities/accordion-group.type";

/** 开发环境导航 */
const accordionGroupDev: AccordionGroup[] = [
    {
        name: 'Basic 基础', icon: 'bi bi-x-diamond-fill',
        data: [
            { name: 'login 登录页', icon: 'bi bi-arrow-right-circle', link: '/passport/login' },
            { name: 'charts 图表', icon: 'bi bi-pie-chart', link: '/sample/charts' },
            { name: 'ol-map 地图', icon: 'bi bi-map', link: '/sample/ol-map' },
            { name: 'modal 模态框', icon: 'bi bi-menu-up', link: '/sample/modal' },
            { name: 'tabs 便签页', icon: 'bi bi-menu-button-wide', link: '/sample/tabs' },
            { name: 'message 全局提示', icon: 'bi bi-chat-dots', link: '/sample/message' },
        ]
    },
    {
        name: 'Form 表单', icon: 'bi bi-toggles',
        data: [
            { name: 'input 输入框', icon: 'bi bi-input-cursor', link: '/form/input' },
            { name: 'select 选择器', icon: 'bi bi-caret-down-square', link: '/form/select' },
            { name: 'select 搜索选择器', icon: 'bi bi-search', link: '/form/search-select' },
            { name: 'date-picker 日期选择器', icon: 'bi bi-calendar-date', link: '/form/date-picker' },
        ]
    },
    {
        name: 'Delon 工具包', icon: 'bi bi-tools',
        data: [
            { name: 'cache 缓存', icon: 'bi bi-cpu', link: '/delon/cache' },
            { name: 'lazy-load 懒加载', icon: 'bi bi-boxes', link: '/delon/lazy-load' },
            { name: 'zip 操作', icon: 'bi bi-file-earmark-zip', link: '/delon/zip' },
            { name: 'http 请求', icon: 'bi bi-ethernet', link: '/delon/http-test' },
            { name: 'mock 数据', icon: 'bi bi-yin-yang', link: '/delon/mock-test' },
        ]
    },
    {
        name: 'Multimedia 多媒体', icon: 'bi bi-camera-fill',
        data: [
            { name: 'photo 照片', icon: 'bi bi-images', link: '/sample/photo' },
            { name: 'video 视频', icon: 'bi bi-camera-video', link: '/sample/video' },
            { name: 'audio 音频', icon: 'bi bi-volume-up', link: '/sample/audio' },
            { name: 'scan 扫码', icon: 'bi bi-upc-scan', link: '/sample/scan' },
            { name: 'bluetooth 蓝牙', icon: 'bi bi-bluetooth', link: '/sample/bluetooth' },
        ]
    },
]

/** 生产环境导航 */
export const accordionGroup: AccordionGroup[] = [
    ...(environment.production && [] || accordionGroupDev),
    {
        name: '巡检采集', icon: 'bi bi-clipboard-data',
        data: [
            { name: '列表', link: '/inspection/list' },
            { name: '下载', link: '/inspection/download' },
            { name: '上传', link: '/inspection/uploading' },
        ]
    },
    {
        name: '故障', icon: 'bi bi-shield-fill-exclamation',
        data: [
            { name: '列表', link: '/breakdown/list' },
        ]
    },
    {
        name: '维修', icon: 'bi bi-wrench',
        data: [
            { name: '列表', link: '/maintenance/list' },
            { name: '历史', link: '/maintenance/history' },
            { name: '下载', link: '/maintenance/download' },
            { name: '上传', link: '/maintenance/uploading' },
        ]
    },
    {
        name: '实时监控', icon: 'bi bi-info-circle-fill',
        data: [
            { name: '区域列表', link: '/monitoring/list' },
        ]
    },

    {
        name: '管网监控', icon: 'bi bi-grid-3x3',
        data: [
            { name: '管网监控 ', icon: 'bi bi-clipboard-data', link: '/watermains/main' },
        ]
    },
    {
        name: '大用户', icon: 'bi bi-person-plus-fill',
        data: [
            { name: '我的收藏', icon: 'bi bi-star', link: '/big-user/star' },
            { name: '数据分析', icon: 'bi bi-graph-up', link: '/big-user/analyse' },
        ]
    },
    {
        name: '制水厂', icon: 'bi bi-droplet-half',
        data: [
            { name: '水厂数据', link: '/waterworks/main' },
        ]
    },
    {
        name: '值班', icon: 'bi bi-calendar-event',
        data: [
            { name: '签到', link: '/be-on-duty/dutyplan' },
            { name: '值班公告', link: '/be-on-duty/dutynotice' },
            { name: '值班日志', link: '/be-on-duty/dutylog' },
        ]
    },
    {
        name: '工单', icon: 'bi bi-wrench',
        data: [
            { name: '列表', link: '/work/list' },
            { name: '下载', link: '/work/download' },
            { name: '上传', link: '/work/uploading' },
        ]
    },
    {
        name: '应急事件', icon: 'bi bi-shield-fill-exclamation',
        data: [
            { name: '列表', link: '/event/list' },
        ]
    },
    {
        name: '常州BI', icon: 'bi bi-shield-fill-check',
        data: [
            { name: '业务指标', link: '/bi/business' },
            { name: '营销指标', link: '/bi/marketing' },
            { name: '经营指标', link: '/bi/operation' },
            { name: '生产指标', link: '/bi/production' },
            { name: '服务指标', link: '/bi/serve' },
            { name: '二供指标', link: '/bi/sws' },
        ]
    },
]