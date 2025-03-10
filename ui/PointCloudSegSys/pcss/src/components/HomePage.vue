<template>
  <div class="home-page">
    <h1>点云分割系统</h1>
    <h2>Point Cloud Segmentation System</h2>
    <ul>
      <li>
        <router-link to="/offline-segmentation">离线分割</router-link>
      </li>
      <li>
        <router-link to="/real-time-segmentation">实时分割</router-link>
      </li>
      <li>
        <router-link to="/model-management">模型管理</router-link>
      </li>
      <li>
        <router-link to="/system-monitoring">系统监控</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
}

h2 {
  color: #42b983;
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  background-color: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
