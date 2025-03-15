<template>
  <div class="grid-view">
    <el-scrollbar>
      <el-row :gutter="20" class="grid-row">
        <el-col :span="12">
          <div class="grid-item">
            <h3>控制面板</h3>
            <div class="sub-item">
              <!-- <el-row class="control-row"> -->
              <el-form :inline="true" v-model="dataSource" class="data-source">
                <el-form-item>
                  <el-button color="#2f5597" @click="connectDataSource">配置数据源</el-button>
                </el-form-item>
                <el-form-item label="IP">
                  <el-input placeholder="例如：127.0.0.1" style="width: 128px;" v-model="dataSource.ip"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                  <el-input placeholder="例如：8080" style="width: 128px;" v-model="dataSource.port"></el-input>
                </el-form-item>
                <el-form-item label="接口" style="flex: 1;">
                  <el-input placeholder="例如：/api" v-model="dataSource.api"></el-input>
                </el-form-item>
              </el-form>
              <!-- </el-row> -->
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
                <el-col style="flex: 3; padding-right: 30px;">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="renderProgress"
                    status="success"></el-progress>
                </el-col>
              </el-row>
              <el-row class="control-row">
                <el-col style="flex: none;">
                  <el-button-group v-if="controlStatus !== 'init'">
                    <el-button @click="prevFrame" color="#2f5597" icon="ArrowLeft">上一帧</el-button>
                    <el-button @click="nextFrame" color="#2f5597">下一帧<el-icon class="el-icon--right">
                        <ArrowRight />
                      </el-icon>
                    </el-button>
                  </el-button-group>
                  <el-button-group v-else>
                    <el-button disabled color="#2f5597" icon="ArrowLeft">上一帧</el-button>
                    <el-button disabled color="#2f5597">下一帧<el-icon class="el-icon--right">
                        <ArrowRight />
                      </el-icon>
                    </el-button>
                  </el-button-group>
                </el-col>
                <el-col style="flex: none;">
                  <el-button color="#2f5597" @click="downloadPcd" v-if="controlStatus === 'rendered'">保存结果</el-button>
                  <el-button color="#2f5597" disabled v-else>保存点云</el-button>
                </el-col>
                <el-col style="flex: none;">
                  <el-button color="#2f5597" @click="downloadLabel" v-if="controlStatus === 'rendered'">保存结果</el-button>
                  <el-button color="#2f5597" disabled v-else>保存结果</el-button>
                </el-col>
                <el-col style="flex: 1;">
                  <el-text v-if="controlStatus === 'init'" class="contr-status"><el-icon style="padding-right: 8px;">
                      <InfoFilled />
                    </el-icon>数据源未配置，请先配置。</el-text>
                  <el-text v-else-if="controlStatus === 'uploaded'" class="contr-status"><el-icon
                      style="padding-right: 8px;">
                      <InfoFilled />
                    </el-icon>文件接收成功，当前帧：{{ frameId }}。</el-text>
                  <el-text v-else-if="controlStatus === 'rendered'" class="contr-status"><el-icon
                      style="padding-right: 8px;">
                      <InfoFilled />
                    </el-icon>点云文件已完成分割，可选择路径保存点云/结果。</el-text>
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
import EChartGLVis from '@/components/PcdVisTool/eChartGLVis.vue'

export default {
  name: 'OfflineSegmentation',
  components: {
    EChartGLVis,
  },
  data() {
    return {
      log: '',
      renderProgress: 0,
      frameId: '',
      maxFrameId: '000009',
      minFrameId: '000000',
      controlStatus: 'init',
      dataSource: {
        ip: '127.0.0.1',
        port: '8484',
        api: '/api/realtime',
      },
    };
  },

  mounted() {

  },

  methods: {
    async connectDataSource() {
      this.log += `正在连接数据源...\n`;
      this.frameId = '000000';
      await this.loadData();
      this.log += `数据源连接成功。\n`;
    },

    async nextFrame() {
      if (this.frameId < this.maxFrameId) {
        this.frameId = (parseInt(this.frameId) + 1).toString().padStart(6, '0');
        this.log += `正在加载下一帧...\n`;
        this.loadData();
        this.log += `加载成功，当前帧为：${this.frameId}\n`;
      }else{
        this.log += `当前帧为最后一帧，无法继续。\n`;
      }
    },

    async prevFrame() {
      if (this.frameId > this.minFrameId) {
        this.frameId = (parseInt(this.frameId) - 1).toString().padStart(6, '0');
        this.log += `正在加载上一帧...\n`;
        this.loadData();
        this.log += `加载成功，当前帧为：${this.frameId}\n`;
      }else{
        this.log += `当前帧为第一帧，无法继续。\n`;
      }
    },

    async loadData() {
      try {
        const [binData, labelData] = await Promise.all([
          fetch(`https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.bin`).then((r) =>
            r.arrayBuffer()
          ),
          fetch(`https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.label`).then((r) =>
            r.arrayBuffer()
          ),
        ]);

        this.$refs.chart1.setData(binData, labelData);
        this.$refs.chart2.setData(binData, labelData);
        this.$refs.chart3.setData(binData, labelData);

        this.controlStatus = 'uploaded';
      } catch (error) {
        this.log += `加载数据失败，错误信息为：${error.message}。\n`;
        console.error(error);
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

    downloadPcd() {
      window.location.href = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.bin`;
    },

    downloadLabel() {
      window.location.href = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.label`;
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

.data-source {
  display: flex;
  flex-direction: row;
}
</style>
