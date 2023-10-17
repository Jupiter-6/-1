// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  /** 静态资源前缀 */
  assets_prefix: '',
  /** 动态资源前缀 */
  api_prefix: '/server',
  /** 测试用例模块 */
  routes: [
    {
      path: 'sample',
      loadChildren: () => import('../app/sample/sample.module').then(m => m.SampleModule)
    },
    {
      path: 'delon',
      loadChildren: () => import('../app/sample/delon/delon.module').then(m => m.DelonModule)
    },
    {
      path: 'form',
      loadChildren: () => import('../app/sample/form/form.module').then(m => m.FormModule)
    },
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
