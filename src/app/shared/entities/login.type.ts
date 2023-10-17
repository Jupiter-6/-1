export interface DdloginParams {
    /**
     * 在sys_ddapp表注册的appcode
     */
    appcode: string;
    /**
     * js拿到的钉钉免登授权码
     */
    ddcode: string;
    /**
     * 当前组织
     */
    orgno: string;
}


export interface LoginParams {
    /**
     * 登录账号
     */
    username: string;
    /**
     * 密码原文
     */
    password: string;
    /**
     * 临时第三方绑定token
     */
    tmpBindToken?: string;

}