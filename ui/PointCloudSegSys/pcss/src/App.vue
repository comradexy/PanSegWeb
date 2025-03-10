<!-- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->


<template>
  <div id="app">
    <!-- 顶部任务栏 -->
    <header class="taskbar">
      <div class="taskbar-left">
        <span>点云分割系统</span>
      </div>
      <div class="taskbar-right">
        <button @click="openSettings">更多设置</button>
        <button @click="openProfile">个人中心</button>
      </div>
    </header>

    <!-- 主体布局 -->
    <div class="layout">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <nav>
          <router-link to="/">首页</router-link>
          <router-link to="/offline-segmentation">离线分割</router-link>
          <router-link to="/real-time-segmentation">实时分割</router-link>
          <router-link to="/model-management">模型管理</router-link>
          <router-link to="/system-monitoring">系统监控</router-link>
        </nav>
      </aside>

      <!-- 内容区域 -->
      <main class="content">
        <router-view />
      </main>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>版本: ver 0.0.1</p>
    </footer>

    <!-- 更多设置弹窗 -->
    <div v-if="showSettings" class="modal">
      <div class="modal-content">
        <h3>更多设置</h3>
        <p>这里是更多设置的内容。</p>
        <button @click="closeSettings">关闭</button>
      </div>
    </div>

    <!-- 个人中心弹窗 -->
    <div v-if="showProfile" class="modal">
      <div class="modal-content">
        <h3>个人中心</h3>
        <p>这里是个人中心的内容。</p>
        <button @click="closeProfile">关闭</button>
      </div>
    </div>
  </div>
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
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 顶部任务栏 */
.taskbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50; /* 任务栏背景颜色 */
  color: white; /* 任务栏文字颜色 */
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.taskbar-left span {
  font-size: 18px;
  font-weight: bold;
}

.taskbar-right button {
  background-color: #42b983; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  border: none;
  padding: 8px 16px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.taskbar-right button:hover {
  background-color: #3aa876; /* 按钮悬停背景颜色 */
}

/* 主体布局 */
.layout {
  display: flex;
  flex: 1;
}

/* 侧边栏 */
.sidebar {
  width: 200px; /* 侧边栏宽度 */
  background-color: #34495e; /* 侧边栏背景颜色 */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar nav {
  display: flex;
  flex-direction: column;
}

.sidebar nav a {
  color: white; /* 文字颜色 */
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar nav a:hover {
  background-color: #3b4f63; /* 鼠标悬停背景颜色 */
}

.sidebar nav a.router-link-exact-active {
  background-color: #42b983; /* 当前选中项背景颜色 */
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5; /* 内容区域背景颜色 */
}

/* 底部信息 */
.footer {
  text-align: center;
  padding: 10px;
  background-color: #2c3e50; /* 底部背景颜色 */
  color: white; /* 底部文字颜色 */
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
