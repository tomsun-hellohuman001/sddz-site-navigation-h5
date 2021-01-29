function layzLoading (path) {
    return () =>
        import (`components/${path}.vue`)
}

export default [
    {
      path: '/',
        name: 'neighborStore',
        component: layzLoading('neighborStore'),
        meta: {
            title: '附近的店'
        },
    }, {
        path: '/site',
        name: 'siteList',
        component: layzLoading('siteList'),
        meta: {
            title: '站点导航'
        },
    },{
      path: '/info',
      name: 'siteInfo',
      component: layzLoading('siteInfo'),
      meta: {
          title: '站点信息'
      },
    },{
    path: '/carHome',
    name: 'carHome',
    component: layzLoading('reservation/carHome'),
    meta: {
      title: '正宏石化'
    },
  }, {
    path: '/addApply',
    name: 'addApply',
    component: layzLoading('reservation/addApply'),
    meta: {
      title: '正宏石化'
    },
  },
  {
    path: '/process',
    name: 'process',
    component: layzLoading('reservation/process'),
    meta: {
      title: '正宏石化'
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: layzLoading('reservation/contact'),
    meta: {
      title: '正宏石化'
    },
  },
  {
    path: '/myApply',
    name: 'myApply',
    component: layzLoading('reservation/myApply'),
    meta: {
      title: '正宏石化'
    },
  },
  {
    path: '/intoHome',
    name: 'intoHome',
    component: layzLoading('reservation/intoHome'),
    meta: {
      title: '首页'
    },
  },
  {
    path: '/register',
    name: 'register',
    component: layzLoading('reservation/register'),
    meta: {
      title: '注册信息'
    },
  },
  {
    path: '/unapproved',
    name: 'unapproved',
    component: layzLoading('reservation/unapproved'),
    meta: {
      title: '未被许可'
    },
  },
  {
    path: '/clause',
    name: 'clause',
    component: layzLoading('reservation/clause'),
    meta: {
      title: '同意规定'
    },
  },
  {
    path: '/selectGoodsType',
    name: 'selectGoodsType',
    component: layzLoading('reservation/selectGoodsType'),
    meta: {
      title: '选择商品类型'
    },
  },
  {
    path: '/inOrOut',
    name: 'inOrOut',
    component: layzLoading('reservation/inOrOut'),
    meta: {
      title: '是否进入'
    },
  },
  {
    path: '/flowChart',
    name: 'flowChart',
    component: layzLoading('reservation/flowChart'),
    meta: {
      title: '流程图'
    },
  },
  {
    path: '/tellus',
    name: 'tellus',
    component: layzLoading('reservation/tellus'),
    meta: {
      title: '联系我们'
    },
  },
  {
    path: '/routeIndication',
    name: 'routeIndication',
    component: layzLoading('reservation/routeIndication'),
    meta: {
      title: '指示图'
    },
  },
  {
    path: '/final',
    name: 'final',
    component: layzLoading('reservation/final'),
    meta: {
      title: '授权页面'
    },
  },

  {
    path: '/managerLogin',
    name: 'managerLogin',
    component: layzLoading('reservation/managerLogin'),
    meta: {
      title: '管理端登录'
    },
  },

  {
    path: '/managerAddWhite',
    name: 'managerAddWhite',
    component: layzLoading('reservation/managerAddWhite'),
    meta: {
      title: '管理端添加白名单'
    },
  },
  {
    path: '/waitStatus',
    name: 'waitStatus',
    component: layzLoading('reservation/waitStatus'),
    meta: {
      title: '个人排队状态'
    },
  },
  {
    path:'/sorryPage',
    name:'sorryPage',
    component:layzLoading('reservation/sorryPage'),
    meta:{
      title:'请前往扫码登记',
    }
  },
  {
    path:'/driverMessage',
    name:'driverMessage',
    component:layzLoading('reservation/driverMessage'),
    meta:{
      title:'司机个人信息',
    }
  },


]
