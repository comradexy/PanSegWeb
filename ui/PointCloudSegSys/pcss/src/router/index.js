// import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

// export default router


import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import OfflineSegmentation from '../components/OfflineSegmentation.vue';
import RealTimeSegmentation from '../components/RealTimeSegmentation.vue';
import ModelManagement from '../components/ModelManagement.vue';
import SystemMonitoring from '../components/SystemMonitoring.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/offline-segmentation', component: OfflineSegmentation },
  { path: '/real-time-segmentation', component: RealTimeSegmentation },
  { path: '/model-management', component: ModelManagement },
  { path: '/system-monitoring', component: SystemMonitoring },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
