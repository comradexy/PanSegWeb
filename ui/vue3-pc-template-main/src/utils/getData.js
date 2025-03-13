
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
        title: '实时分割'
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
      path: 'tableTemplate1',
      id: 3001,
      name: 'tableTemplate1',
      meta: {
        title: '示例1',
      }
    },
    {
      path: 'tableTemplate2',
      id: 3002,
      name: 'tableTemplate2',
      meta: {
        title: '示例2',
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
      // {
      //     path: 'cardTemplate2',
      //     id: 1004,
      //     name: 'cardTemplate2',
      //     meta: {
      //         title: 'echarts卡片'
      //     }
      // }
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
        title: '组织架构',
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
