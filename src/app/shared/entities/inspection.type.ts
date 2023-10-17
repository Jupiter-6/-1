import { SafeResourceUrl } from "@angular/platform-browser"

export type MediaType = 'photo' | 'video' | 'audio' | 'exception';
export interface InspectionParamMap {
    taskid?: string;
    houseid?: string;
    deviceid?: string;
    projectid?: string;
}
export interface ResourceUrl {
    url: string | SafeResourceUrl | { changingThisBreaksApplicationSecurity: string };
    remark?: string;
    name?: string;
    /** 是否异步 */
    async?: boolean;
}
export interface MediaData {
    photo: {
        [key: string]: ResourceUrl[];
    },
    video: {
        [key: string]: ResourceUrl[];
    },
    audio: {
        [key: string]: ResourceUrl[];
    },
    exception: {
        [key: string]: ResourceUrl[];
    },
}