<template>
  <div class="point-cloud-visualization">
    <div class="controls">
      <div class="frame-selector">
        <label>点云序号：</label>
        <input type="text" v-model="frameId" placeholder="000000" maxlength="6" />
        <button @click="loadFrame">加载点云</button>
      </div>
      <div class="mode-buttons">
        <button @click="showIntensity">反射强度</button>
        <button @click="showSemantic">语义分割</button>
        <button @click="showInstance">实例分割</button>
      </div>
    </div>

    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import semanticConfig from '../assets/semantic-kitti.json';

export default {
  name: 'PointCloudVisualization',
  data() {
    return {
      chart: null,
      frameId: '',
      points: [],       // [x, y, z]
      intensity: [],    // 反射强度
      semantics: [],    // 语义标签
      instances: [],    // 实例标签
      colorMode: 'intensity', // 当前显示模式
      instanceColorMap: new Map(),

      learning_map: semanticConfig.learning_map,
      learning_map_inv: semanticConfig.learning_map_inv,
      color_map: semanticConfig.color_map,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.setOption([]);
    },

    setOption(visData) {
      const option = {
        backgroundColor: '#000',
        tooltip: {},
        xAxis3D: { type: 'value', min: -50, max: 50 },
        yAxis3D: { type: 'value', min: -50, max: 50 },
        zAxis3D: { type: 'value', min: -5, max: 10 },
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
        series: [{
            type: 'scatter3D',
            data: visData.map((point) => ({
              value: [point.value[0], point.value[1], point.value[2]],
              itemStyle: {
                color: point.color,
              },
            })),
            symbolSize: 1.2,
          }],
      };
      this.chart.setOption(option, true);
    },

    async loadFrame() {
      if (!/^\d{6}$/.test(this.frameId)) {
        alert('请输入6位数字序号');
        return;
      }

      try {
        // 加载点云数据
        const [pcdData, labelData] = await Promise.all([
          this.fetchBinFile(`${this.frameId}.bin`),
          this.fetchLabelFile(`${this.frameId}.label`)
        ]);

        // 解析数据
        this.parseBinData(pcdData);
        this.parseLabelData(labelData);

        this.updateVisualization();
      } catch (error) {
        console.error('加载失败:', error);
        alert('加载失败，请检查网络和序号');
      }
    },

    async fetchBinFile(filename) {
      const url = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${filename}`;
      const res = await fetch(url);
      return new Float32Array(await res.arrayBuffer());
    },

    async fetchLabelFile(filename) {
      const url = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${filename}`;
      const res = await fetch(url);
      return new Uint32Array(await res.arrayBuffer());
    },

    parseBinData(data) {
      this.points = [];
      this.intensity = [];
      for (let i = 0; i < data.length; i += 4) {
        this.points.push([data[i], data[i + 1], data[i + 2]]);
        this.intensity.push(data[i + 3]);
      }
    },

    parseLabelData(data) {
      this.semantics = [];
      this.instances = [];
      data.forEach(label => {
        this.semantics.push(this.learning_map[label & 0xFFFF] || 0);
        this.instances.push(label >>> 16);
      });
    },

    generateVisualizationData() {
      return this.points.map((point, index) => ({
        value: point,
        color: this.getColor(index)
      }));
    },

    getColor(index) {
      switch (this.colorMode) {
        case 'intensity': return this.getIntensityColor(index);
        case 'semantic': return this.getSemanticColor(index);
        case 'instance': return this.getInstanceColor(index);
        default: return '#ffffff';
      }
    },

    getIntensityColor(index) {
      const val = this.intensity[index];
      const normalized = Math.min(Math.max(val, 0), 1);
      const gray = Math.floor(normalized * 255);
      return `rgb(${gray},${gray},${gray})`;
    },

    getSemanticColor(index) {
      const semId = this.semantics[index];
      const colorId = this.learning_map_inv[semId] || 0;
      const rgb = this.color_map[colorId] || [100, 100, 100];
      return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
    },

    getInstanceColor(index) {
      const instanceId = this.instances[index];
      if (instanceId === 0) return '#888888';

      if (!this.instanceColorMap.has(instanceId)) {
        const hue = Math.random() * 360;
        this.instanceColorMap.set(instanceId, `hsl(${hue},100%,50%)`);
      }
      return this.instanceColorMap.get(instanceId);
    },

    updateVisualization() {
      if (this.points.length > 0) {
        this.setOption(this.generateVisualizationData());
      }
    },

    showIntensity() {
      this.colorMode = 'intensity';
      this.updateVisualization();
    },

    showSemantic() {
      this.colorMode = 'semantic';
      this.updateVisualization();
    },

    showInstance() {
      this.colorMode = 'instance';
      this.instanceColorMap.clear();
      this.updateVisualization();
    }
  }
};
</script>

<style scoped>
.controls {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.frame-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  padding: 8px;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  opacity: 0.9;
}

.mode-buttons {
  display: flex;
  gap: 10px;
}

.mode-buttons button {
  background: #42b983;
  color: white;
}

.frame-selector button {
  background: #409eff;
  color: white;
}

.chart-container {
  width: 100%;
  height: 600px;
  background: #000;
  border: 1px solid #333;
}
</style>