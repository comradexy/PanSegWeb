<template>
  <div class="grid-view">
    <el-scrollbar>
      <el-row :gutter="20" class="grid-row">
        <el-col :span="12">
          <div class="grid-item">
            <h3>控制面板</h3>
            <p>Control Panel</p>
            <div class="sub-item">
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button type="primary" @click="loadData">上传点云</el-button>
                </el-col>
                <el-col style="flex: 4;">
                  <el-input placeholder="000000.bin" readonly></el-input>
                </el-col>
                <el-col style="flex: 3;">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="70"
                    id="upload-progress"></el-progress>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button type="primary" @click="showIntensity">点云预览</el-button>
                </el-col>
                <el-col style="flex: none;">
                  <el-button type="primary" @click="showSemantic">语义分割</el-button>
                </el-col>
                <el-col style="flex: none;">
                  <el-button type="primary" @click="showInstance">实例分割</el-button>
                </el-col>
                <el-col style="flex: 3;">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="10"
                    id="upload-progress"></el-progress>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button type="primary">选择路径</el-button>
                </el-col>
                <el-col style="flex: 1;">
                  <el-input placeholder="D:\File\PointCloud\Label" readonly></el-input>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button type="primary">保存结果</el-button>
                </el-col>
                <el-col style="flex: 1;">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="50"
                    id="upload-progress"></el-progress>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: 1;">
                  <p>--- 操作日志 ---</p>
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3 }" readonly v-model="log">
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-item">
            <h3>点云预览</h3>
            <p>Point Cloud Preview</p>
            <div class="pcd-vis">
              <EChartGLVis ref="chart1" />
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="grid-row">
        <el-col :span="12">
          <div class="grid-item">
            <h3>语义分割</h3>
            <p>Semantic Segmentation</p>
            <div class="pcd-vis">
              <EChartGLVis ref="chart2" />
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-item">
            <h3>实例分割</h3>
            <p>Instance Segmentation</p>
            <div class="pcd-vis">
              <EChartGLVis ref="chart3" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import EChartGLVis from '@/components/PcdVisTool/EChartGLVis.vue'

export default {
  name: 'OfflineSegmentation',
  components: {
    EChartGLVis,
  },
  data() {
    return {
      log: '当前无任何操作记录',
      uploadProgress: 0,
      renderProgress: 0,
      saveProgress: 0,
      fileName: '000000',
    };
  },

  mounted() {

  },

  methods: {
    // 加载数据
    async loadData() {
      try {
        const [binData, labelData] = await Promise.all([
          fetch(`https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.fileName}.bin`).then((r) =>
            r.arrayBuffer()
          ),
          fetch(`https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.fileName}.label`).then((r) =>
            r.arrayBuffer()
          ),
        ]);

        this.$refs.chart1.setData(binData, labelData);
        this.$refs.chart2.setData(binData, labelData);
        this.$refs.chart3.setData(binData, labelData);

        console.log('数据加载完成');
      } catch (error) {
        console.error('加载数据失败:', error);
        alert('加载数据失败，请检查文件路径');
      }
    },

    // 显示反射强度
    async showIntensity() {
      this.$refs.chart1.showIntensity();
    },

    // 显示语义分割
    async showSemantic() {
      this.$refs.chart2.showSemantic();
    },

    // 显示实例分割
    async showInstance() {
      this.$refs.chart3.showInstance();
    },
  },
};

</script>

<style scoped>
.grid-view {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}

.grid-item {
  height: 420px;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.sub-item {
  padding: 10px;
  margin-top: 10px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.grid-row {
  padding: 0;
  margin-bottom: 20px;
}

h3 {
  margin: 6px 0 6px;
  color: #303133;
}

p {
  margin: 6px 0 6px;
  color: #606266;
}

.el-scrollbar__bar.is-vertical {
  width: 6px;
}

.el-scrollbar__thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
}

.pcd-vis {
  height: 330px;
  padding: 10px;
}
</style>
