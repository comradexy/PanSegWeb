<template>
  <div class="grid-view">
    <el-scrollbar>
      <el-row :gutter="20" class="grid-row">
        <el-col :span="12">
          <div class="grid-item">
            <h3>控制面板</h3>
            <div class="sub-item">
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button @click="triggerFileInput">上传点云</el-button>
                  <input type="file" ref="fileInput" style="display: none" accept=".bin" @change="loadData" />
                </el-col>
                <el-col style="flex: 4;">
                  <el-input v-model="fileName" placeholder="点云文件名" readonly></el-input>
                </el-col>
                <el-col style="flex: 3;">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="uploadProgress"
                    status="success"></el-progress>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button type="info" plain @click="showIntensity" v-if="controlStatus !== 'init'">点云预览</el-button>
                  <el-button type="info" plain disabled v-else>点云预览</el-button>
                </el-col>
                <el-col style="flex: none;">
                  <el-button type="warning" plain @click="showSemantic" v-if="controlStatus !== 'init'">语义分割</el-button>
                  <el-button type="warning" disabled v-else>语义分割</el-button>
                </el-col>
                <el-col style="flex: none;">
                  <el-button type="danger" plain @click="showInstance" v-if="controlStatus !== 'init'">实例分割</el-button>
                  <el-button type="danger" plain disabled v-else>实例分割</el-button>
                </el-col>
                <el-col style="flex: 3;">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="renderProgress"
                    status="success"></el-progress>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button @click="redirectToDownloadUrl" v-if="controlStatus === 'rendered'">保存结果</el-button>
                  <el-button @click="redirectToDownloadUrl" disabled v-else>保存结果</el-button>
                </el-col>
                <el-col style="flex: 1;">
                  <el-text v-if="controlStatus === 'init'" class="contr-status"><el-icon style="padding-right: 8px;">
                      <InfoFilled />
                    </el-icon>点云文件未上传，请先上传。</el-text>
                  <el-text v-else-if="controlStatus === 'uploaded'" class="contr-status"><el-icon
                      style="padding-right: 8px;">
                      <InfoFilled />
                    </el-icon>点云文件已上传，当前点云预览与分割可用。</el-text>
                  <el-text v-else-if="controlStatus === 'rendered'" class="contr-status"><el-icon
                      style="padding-right: 8px;">
                      <InfoFilled />
                    </el-icon>点云文件已完成分割，可选择路径保存结果。</el-text>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col>
                  <p style="margin: 0 0 10px;">--- 操作日志 ---</p>
                  <el-input type="textarea" placeholder="操作记录及处理结果" v-model="log" :rows="7" resize="none" readonly />
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-item">
            <h3>点云预览</h3>
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
            <div class="pcd-vis">
              <EChartGLVis ref="chart2" />
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-item">
            <h3>实例分割</h3>
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
import EChartGLVis from '@/components/PcdVisTool/eChartGLVis.vue';

export default {
  name: 'OfflineSegmentation',
  components: {
    EChartGLVis,
  },
  data() {
    return {
      log: '',
      uploadProgress: 0,
      renderProgress: 0,
      saveProgress: 0,
      fileName: '',
      frameId: '',
      controlStatus: 'init',
    };
  },

  mounted() {

  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async loadData() {
      this.uploadProgress = 0;
      try {
        const file = this.$refs.fileInput.files[0];
        this.fileName = file.name;
        this.frameId = file.name.split('.')[0];
        this.log += `开始上传点云数据，文件名 ${this.fileName}...\n`;

        const [binData, labelData] = await Promise.all([
          fetch(`https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.bin`).then((r) =>
            r.arrayBuffer()
          ),
          fetch(`https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.label`).then((r) =>
            r.arrayBuffer()
          ),
        ]);

        this.uploadProgress += 20;
        this.$refs.chart1.setData(binData, labelData);
        this.$refs.chart2.setData(binData, labelData);
        this.$refs.chart3.setData(binData, labelData);
        this.uploadProgress += 10;

        const timer = setInterval(() => {
          if (this.uploadProgress < 100) {
            this.uploadProgress += 1;
          } else {
            clearInterval(timer);
            this.log += `加载数据成功，数据大小为 ${(binData.byteLength / (1024 * 1024)).toFixed(3)} MB。\n`;
          }
        }, 2);
        this.controlStatus = 'uploaded';
      } catch (error) {
        this.log += `加载数据失败，错误信息为：${error.message}。\n`;
        console.error(error);
        this.uploadProgress = 0;
      }
    },

    // 显示反射强度
    async showIntensity() {
      this.renderProgress = 0;
      this.log += `正在渲染点云预览可视化数据...\n`;

      const timer1 = setInterval(() => {
        if (this.renderProgress < 60) {
          this.renderProgress += 10;
        } else {
          clearInterval(timer1);
        }
      }, 5);

      this.$refs.chart1.showIntensity();

      const timer2 = setInterval(() => {
        if (this.renderProgress < 100) {
          this.renderProgress += 1;
        } else {
          clearInterval(timer2);
          this.log += `点云预览可视化数据渲染成功。\n`;
        }
      }, 1);
    },

    // 显示语义分割
    async showSemantic() {
      this.renderProgress = 0;
      this.log += `正在渲染点云语义分割可视化数据...\n`;

      const timer1 = setInterval(() => {
        if (this.renderProgress < 60) {
          this.renderProgress += 10;
        } else {
          clearInterval(timer1);
        }
      }, 5);

      this.$refs.chart2.showSemantic();

      const timer2 = setInterval(() => {
        if (this.renderProgress < 100) {
          this.renderProgress += 1;
        } else {
          clearInterval(timer2);
          this.log += `点云语义分割可视化数据渲染成功。\n`;
        }
      }, 1);
      this.controlStatus = 'rendered';
    },

    // 显示实例分割
    async showInstance() {
      this.renderProgress = 0;
      this.log += `正在渲染点云实例分割可视化数据...\n`;

      const timer1 = setInterval(() => {
        if (this.renderProgress < 60) {
          this.renderProgress += 10;
        } else {
          clearInterval(timer1);
        }
      }, 5);

      this.$refs.chart3.showInstance();

      const timer2 = setInterval(() => {
        if (this.renderProgress < 100) {
          this.renderProgress += 1;
        } else {
          clearInterval(timer2);
          this.log += `点云实例分割可视化数据渲染成功。\n`;
        }
      }, 1);
      this.controlStatus = 'rendered';
    },

    redirectToDownloadUrl() {
      window.location.href = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.label`;
    },

  },
};

</script>

<style scoped>
.grid-view {
  height: 100%;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}

.grid-item {
  height: 420px;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.sub-item {
  padding: 10px;
  margin-top: 10px;
  height: 85%;
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

.el-scrollbar__bar.is-vertical {
  width: 6px;
}

.el-scrollbar__thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
}

.pcd-vis {
  height: 85%;
  padding: 10px;
}

.control-status {
  font-size: 14px;
  margin: 6px 8px;
  text-align: left;
}
</style>
