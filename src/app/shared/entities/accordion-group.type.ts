/** 导航 */
export interface NavBar {
    /** 导航名 */
    name: string;
    /** 导航icon */
    icon?: string;
    /** 路由 */
    link: string;
}
/** 手风琴导航 */
export interface AccordionGroup {
    /** 分组名 */
    name: string;
    /** 分组icon */
    icon?: string;
    /** 导航列表 */
    data: NavBar[];
}