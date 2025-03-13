<template>
  <div class="grid-view">
    <!-- 使用 el-scrollbar 包裹内容 -->
    <el-scrollbar>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-item">
            <h3>控制面板</h3>
            <p>Control Panel</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-item">
            <h3>点云预览</h3>
            <p>Point Cloud Preview</p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-item">
            <h3>语义分割</h3>
            <p>Semantic Segmentation</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-item">
            <h3>实例分割</h3>
            <p>Instance Segmentation</p>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'realtimeSegmentation',
};
</script>

<style scoped>
.grid-view {
  height: 100vh; /* 设置视图高度为窗口高度 */
  padding: 20px;
  box-sizing: border-box; /* 防止 padding 影响高度计算 */
}

.grid-item {
  height: 300px;
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* 添加底部间距 */
}

h3 {
  margin-bottom: 10px;
  color: #303133;
}

p {
  color: #606266;
}

/* 自定义滚动条样式 */
.el-scrollbar__bar.is-vertical {
  width: 6px; /* 滚动条宽度 */
}

.el-scrollbar__thumb {
  background-color: rgba(144, 147, 153, 0.3); /* 滚动条颜色 */
  border-radius: 3px; /* 滚动条圆角 */
}
</style>
