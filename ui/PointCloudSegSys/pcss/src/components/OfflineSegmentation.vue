<template>
  <h1>离线分割</h1>
  <div class="offline-segmentation">
    <!-- 文件选择和进度条 -->
    <div class="controls">
      <input type="file" @change="handleFileUpload" accept=".bin" />
      <button @click="startDetection">开始检测</button>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <span>{{ progress }}%</span>
    </div>

    <!-- 点云可视化窗口 -->
    <div class="visualization">
      <div ref="chart1" class="chart-container"></div>
      <div ref="chart2" class="chart-container"></div>
      <div ref="chart3" class="chart-container"></div>
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
      progress: 0, // 检测进度
      charts: [], // 存储 ECharts 实例
    };
  },
  mounted() {
    // 初始化三个 ECharts 实例
    this.charts = [
      echarts.init(this.$refs.chart1),
      echarts.init(this.$refs.chart2),
      echarts.init(this.$refs.chart3),
    ];
  },
  methods: {
    // 处理文件上传
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Float32Array(e.target.result);
          const points = this.parseBinFile(data);
          this.renderPointCloud(points);
        };
        reader.readAsArrayBuffer(file);
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
        title: {
          text: '3D Point Cloud',
          left: 'center',
          textStyle: {
            color: '#000',
          },
        },
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
                color: this.getColor(point[3]),
              },
            })),
            symbolSize: 1.5,
          },
        ],
      };

      // 为每个 ECharts 实例设置选项
      this.charts.forEach((chart) => {
        chart.setOption(option);
      });
    },

    // 根据特征值获取颜色
    getColor(value) {
      const normalizedIntensity = Math.max(0, Math.min(1, value));
      const hueCold = 255; // 蓝色
      const hueHot = 0; // 红色
      const hue = hueCold + (hueHot - hueCold) * normalizedIntensity;
      return `hsl(${(hue + 360) % 360}, 100%, 50%)`;
    },

    // 模拟检测进度
    startDetection() {
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
.offline-detection {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.progress-bar {
  width: 300px;
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.progress {
  height: 100%;
  background-color: #42b983;
  transition: width 0.5s;
}

.visualization {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.chart-container {
  width: 30%;
  height: 400px;
  border: 1px solid #ddd;
}
</style>