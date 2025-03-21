
const routes = [
  {
    path: '/pointCloudSegmentation',
    id: 2000,
    name: 'pointCloudSegmentation',
    meta: {
      title: '点云分割'
    },
    children: [{
      path: 'offlineSegmentation',
      id: 2001,
      name: 'offlineSegmentation',
      meta: {
        title: '离线分割',
      }
    },
    {
      path: 'realtimeSegmentation',
      id: 2002,
      name: 'realtimeSegmentation',
      meta: {
        title: '在线分割'
      }
    }
    ]
  },
  {
    path: '/tableTemplate',
    id: 3000,
    name: 'tableTemplate',
    meta: {
      title: '模型管理'
    },
    children: [{
      path: 'modelSelect',
      id: 3001,
      name: 'modelSelect',
      meta: {
        title: '模型设置',
      }
    },
    {
      path: 'paramSet',
      id: 3002,
      name: 'paramSet',
      meta: {
        title: '其他设置',
      }
    }
    ]
  },
  {
    path: '/cardTemplate',
    id: 1000,
    name: 'cardTemplate',
    meta: {
      title: '系统监控'
    },
    children: [{
      path: 'cardTemplate1',
      id: 1001,
      name: 'cardTemplate1',
      meta: {
        title: '前端',
      }
    },
    {
      path: 'cardTemplate3',
      id: 1002,
      name: 'cardTemplate3',
      meta: {
        title: '服务端',
      }
    },
    {
      path: 'cardTemplate4',
      id: 1003,
      name: 'cardTemplate4',
      meta: {
        title: '计算端',
      }
    },
    ]
  },
  {
    path: '/systems',
    id: 4000,
    name: 'systems',
    meta: {
      title: '系统设置'
    },
    children: [{
      path: 'structures',
      id: 4001,
      name: 'structures',
      meta: {
        title: '权限管理',
      }
    }
    ]
  }
]

// 模拟获取动态路由数据
export function getDynamicRoutes() {
  return new Promise((resolve) => {
    resolve(routes)
  })
}
