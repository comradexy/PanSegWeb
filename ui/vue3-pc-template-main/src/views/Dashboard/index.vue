<template>
  <div class="introduction">
    <h2>点云分割系统</h2>
    <p class="introduction-desc">
      点云数据是三维空间信息的重要载体，
      广泛应用于自动驾驶、遥感测绘和智能制造等领域。
    </p>
    <p class="introduction-desc">
      点云分割作为核心环节，
      旨在从原始点云中自动识别并提取特定目标。
      尽管深度学习推动了点云分割技术的进步，
      但其工程化应用仍面临挑战。
    </p>
    <p class="introduction-desc">
      为此，我们设计并实现了一套前后端分离的点云分割系统，
      提升了系统的灵活性、可扩展性和易用性，
      为实际应用提供了高效解决方案。
    </p>
  </div>

  <!-- 附图 -->
  <el-row :gutter="20">
    <el-col :span="6">
      <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/pcd.jpg"
        fit="scale-down"></el-image>
      <span>点云</span>
    </el-col>
    <el-col :span="6">
      <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/semantic.jpg"
        fit="scale-down"></el-image>
      <span>语义分割</span>
    </el-col>
    <el-col :span="6">
      <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/instance.jpg"
        fit="scale-down"></el-image>
      <span>实例分割</span>
    </el-col>
    <el-col :span="6">
      <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/panoptic.jpg"
        fit="scale-down"></el-image>
      <span>全景分割</span>
    </el-col>
  </el-row>
</template>

<script setup>

</script>

<style>
.introduction {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.introduction-desc {
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 8px;
  margin-bottom: 8px;
  height: 16px;
}

.el-row {
  /* width: 90%; */
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
  padding: 10px 10px;
  text-align: center;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
