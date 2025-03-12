import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import OfflineSegmentation from '../components/OfflineSegmentation.vue';
import RealTimeSegmentation from '../components/RealTimeSegmentation.vue';
import ModelManagement from '../components/ModelManagement.vue';
import SystemMonitoring from '../components/SystemMonitoring.vue';
import PointCloudVisualization from '@/components/PointCloudVisualization.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/offline-segmentation', component: OfflineSegmentation },
  { path: '/real-time-segmentation', component: RealTimeSegmentation },
  { path: '/model-management', component: ModelManagement },
  { path: '/system-monitoring', component: SystemMonitoring },
  { path: '/pcd-visualization', component: PointCloudVisualization },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
