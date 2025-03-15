<template>
  <div class="dashboard-view">
    <el-space class="introduction" direction="vertical">
      <el-text tag="b" style="color: #2f5597; font-size: 28px; margin-bottom: 16px;">点云分割系统</el-text>
      <el-text class="introduction-desc">
        点云数据是三维空间信息的重要载体，
        广泛应用于自动驾驶、遥感测绘和智能制造等领域。
      </el-text>
      <el-text class="introduction-desc">
        点云分割作为核心环节，
        旨在从原始点云中自动识别并提取特定目标。
        尽管深度学习推动了点云分割技术的进步，
        但其工程化应用仍面临挑战。
      </el-text>
      <el-text class="introduction-desc">
        为此，我们设计并实现了一套前后端分离的点云分割系统，
        提升了系统的灵活性、可扩展性和易用性，
        为实际应用提供了高效解决方案。
      </el-text>
    </el-space>

    <el-row :gutter="20" justify="space-evenly" class="img-grid-row">
      <el-col :span="11" class="img-grid-col">
        <el-text tag="b" class="img-label">3D点云</el-text>
        <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/pcd.jpg"
          fit="cover"></el-image>
      </el-col>
      <el-col :span="11" class="img-grid-col">
        <el-text tag="b" class="img-label">语义分割</el-text>
        <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/semantic.jpg"
          fit="cover"></el-image>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="space-evenly" class="img-grid-row">
      <el-col :span="11" class="img-grid-col">
        <el-text tag="b" class="img-label">实例分割</el-text>
        <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/instance.jpg"
          fit="cover"></el-image>
      </el-col>
      <el-col :span="11" class="img-grid-col">
        <el-text tag="b" class="img-label">全景分割</el-text>
        <el-image src="https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/introduction/panoptic.jpg"
          fit="cover"></el-image>
      </el-col>
    </el-row>

  </div>

</template>

<script setup>

</script>

<style scoped>
.dashboard-view {
  height: 100%;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}

.introduction {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.introduction-desc {
  width: 100%;
  font-size: 18px;
  line-height: 1.5;
  margin-top: 8px;
  margin-bottom: 8px;
  height: 16px;
}

.img-grid-row {
  padding: 20px;
  /* margin-bottom: 30px; */
}

.img-grid-col {
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.img-label {
  font-size: 20px;
  /* color: #2f5597; */
  margin-bottom: 10px;
}
</style>
