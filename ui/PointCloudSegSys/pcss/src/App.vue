<template>
  <el-container class="app-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <el-menu default-active="/" router background-color="#34495e" text-color="#fff" active-text-color="#42b983">
        <el-menu-item index="/">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/offline-segmentation">
          <span>离线分割</span>
        </el-menu-item>
        <el-menu-item index="/real-time-segmentation">
          <span>实时分割</span>
        </el-menu-item>
        <el-menu-item index="/model-management">
          <span>模型管理</span>
        </el-menu-item>
        <el-menu-item index="/system-monitoring">
          <span>系统监控</span>
        </el-menu-item>
        <el-menu-item index="/pcd-visualization">
          <span>点云可视化</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部任务栏 -->
      <el-header class="taskbar">
        <div class="taskbar-left">
          <span>点云分割系统</span>
        </div>
        <div class="taskbar-right">
          <el-button type="primary" @click="openSettings">更多设置</el-button>
          <el-button type="primary" @click="openProfile">个人中心</el-button>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>

    <!-- 更多设置弹窗 -->
    <el-dialog v-model="showSettings" title="更多设置" width="30%">
      <p>这里是更多设置的内容。</p>
      <template #footer>
        <el-button @click="closeSettings">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 个人中心弹窗 -->
    <el-dialog v-model="showProfile" title="个人中心" width="30%">
      <p>这里是个人中心的内容。</p>
      <template #footer>
        <el-button @click="closeProfile">关闭</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showSettings: false, // 控制更多设置弹窗的显示
      showProfile: false, // 控制个人中心弹窗的显示
    };
  },
  methods: {
    openSettings() {
      this.showSettings = true; // 打开更多设置弹窗
    },
    closeSettings() {
      this.showSettings = false; // 关闭更多设置弹窗
    },
    openProfile() {
      this.showProfile = true; // 打开个人中心弹窗
    },
    closeProfile() {
      this.showProfile = false; // 关闭个人中心弹窗
    },
  },
};
</script>

<style>
/* 全局样式 */
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部任务栏 */
.taskbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  /* padding: 0 20px; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.taskbar-left span {
  font-size: 18px;
  font-weight: bold;
}

.taskbar-right{
  margin-left: 10px;
}

/* 侧边栏 */
.sidebar {
  background-color: #34495e;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* 内容区域 */
.content {
  background-color: #f5f5f5;
  padding: 20px;
}
</style>