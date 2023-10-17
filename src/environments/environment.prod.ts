export const environment = {
  production: true,
  assets_prefix: '/ihive-mobile-web',
  api_prefix: '/server',
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
  ],
};
