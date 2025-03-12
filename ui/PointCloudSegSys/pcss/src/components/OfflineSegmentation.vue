<template>
  <h1>离线分割</h1>
  <div class="offline-segmentation">
    <!-- 文件选择和进度条 -->
    <div class="controls">
      <!-- 文件上传按钮 -->
      <button @click="triggerFileInput">上传点云</button>
      <!-- 文件路径显示 -->
      <input type="text" v-model="filePath" readonly placeholder="文件路径" />
      <!-- 隐藏的文件输入框 -->
      <input type="file" ref="fileInput" style="display: none" accept=".bin" @change="handleFileUpload" />

      <!-- 开始分割按钮 -->
      <el-button @click="startSegmentation">开始分割</el-button>
      <!-- 进度条 -->
      <el-progress :text-inside="true" :stroke-width="20" :percentage="progress"></el-progress>

      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一帧</el-button>
        <el-button type="primary">下一帧<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>

      <el-button type="primary">保存<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>

    <!-- 点云可视化窗口 -->
    <div class="visualization">
      <div ref="chart1" class="chart-container"></div>
      <!-- <div ref="chart2" class="chart-container"></div>
      <div ref="chart3" class="chart-container"></div> -->
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
  name: 'OfflineSegmentation',
  data() {
    return {
      filePath: '', // 文件路径
      progress: 0, // 检测进度
      charts: [], // 存储 ECharts 实例
    };
  },
  mounted() {
    // 初始化三个 ECharts 实例
    this.charts = [
      echarts.init(this.$refs.chart1),
      // echarts.init(this.$refs.chart2),
      // echarts.init(this.$refs.chart3),
    ];
  },
  methods: {
    // 触发文件选择框
    triggerFileInput() {
      this.$refs.fileInput.click(); // 模拟点击文件输入框
    },

    // 处理文件上传
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // 获取文件的绝对路径
        this.filePath = file.name;

        // 读取文件并解析点云数据
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Float32Array(e.target.result);
          const points = this.parseBinFile(data);
          this.renderPointCloud(points);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('请选择一个点云文件(.bin)');
      }
    },

    // 解析 .bin 文件
    parseBinFile(data) {
      const points = [];
      for (let i = 0; i < data.length; i += 4) {
        const point = [data[i], data[i + 1], data[i + 2], data[i + 3]];
        points.push(point);
      }
      return points;
    },

    // 渲染点云
    renderPointCloud(points) {
      const option = {
        backgroundColor: '#000',
        // title: {
        //   text: '3D Point Cloud',
        //   left: 'center',
        //   textStyle: {
        //     color: '#000',
        //   },
        // },
        tooltip: {},
        xAxis3D: {
          type: 'value',
          min: -50,
          max: 50,
        },
        yAxis3D: {
          type: 'value',
          min: -50,
          max: 50,
        },
        zAxis3D: {
          type: 'value',
          min: -5,
          max: 10,
        },
        grid3D: {
          show: false,
          boxWidth: 100,
          boxHeight: 15,
          boxDepth: 100,
          viewControl: {
            projection: 'perspective',
            distance: 100,
            minDistance: 10,
            maxDistance: 300,
          },
        },
        series: [
          {
            type: 'scatter3D',
            data: points.map((point) => ({
              value: [point[0], point[1], point[2]],
              itemStyle: {
                color: this.getColorByIntensity(point[3]),
              },
            })),
            symbolSize: 1.5,
          },
        ],
      };

      // 在第一个 ECharts 实例上预览点云文件
      this.charts[0].setOption(option);
    },

    // 根据反射强度获取颜色
    getColorByIntensity(value) {
      const normalizedIntensity = Math.max(0, Math.min(1, value));
      const hueCold = 255; // 蓝色
      const hueHot = 0; // 红色
      const hue = hueCold + (hueHot - hueCold) * normalizedIntensity;
      return `hsl(${(hue + 360) % 360}, 100%, 50%)`;
    },

    // 根据语义分割结果进行渲染
    getColorBySemantic(value) {
      // TODO

      return value;
    },

    // 根据实例分割结果进行渲染
    getColorByInstance(value) {
      // TODO

      return value;
    },

    // 模拟检测进度
    startSegmentation() {
      this.progress = 0;
      const interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10;
        } else {
          clearInterval(interval);
        }
      }, 500);
    },
  },
};
</script>

<style scoped>
.offline-segmentation {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.visualization {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.chart-container {
  width: 40%;
  height: 500px;
  border: 1px solid #ddd;
}
</style>