<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import semanticConfig from '../../assets/semantic-kitti.json';

export default {
  name: 'EChartGLVis',
  data() {
    return {
      chart: null,
      points: [],       // [x, y, z]
      intensity: [],    // 反射强度
      semantics: [],    // 语义标签
      instances: [],    // 实例标签
      colorMode: 'intensity',
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
    // 初始化图表
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.setOption([]);
    },

    // 设置图表配置
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
            itemStyle: { color: point.color },
          })),
          symbolSize: 1.2,
        }],
      };
      this.chart.setOption(option, true);
    },

    // 对外接口：设置原始数据
    setData(binData, labelData) {
      this.parseBinData(new Float32Array(binData));
      this.parseLabelData(new Uint32Array(labelData));
      // this.updateVisualization();
    },

    // 对外接口：显示反射强度
    showIntensity() {
      this.colorMode = 'intensity';
      this.updateVisualization();
    },

    // 对外接口：显示语义分割
    showSemantic() {
      this.colorMode = 'semantic';
      this.updateVisualization();
    },

    // 对外接口：显示实例分割
    showInstance() {
      this.colorMode = 'instance';
      this.instanceColorMap.clear();
      this.updateVisualization();
    },

    // 解析点云数据
    parseBinData(data) {
      this.points = [];
      this.intensity = [];
      for (let i = 0; i < data.length; i += 4) {
        this.points.push([data[i], data[i + 1], data[i + 2]]);
        this.intensity.push(data[i + 3]);
      }
    },

    // 解析标签数据
    parseLabelData(data) {
      this.semantics = [];
      this.instances = [];
      data.forEach(label => {
        this.semantics.push(this.learning_map[label & 0xFFFF] || 0);
        this.instances.push(label >>> 16);
      });
    },

    // 生成可视化数据
    generateVisualizationData() {
      console.log('正在生成可视化数据...');
      return this.points.map((point, index) => ({
        value: point,
        color: this.getColor(index)
      }));
    },

    // 颜色计算逻辑
    getColor(index) {
      switch (this.colorMode) {
        case 'intensity': return this.getIntensityColor(index);
        case 'semantic': return this.getSemanticColor(index);
        case 'instance': return this.getInstanceColor(index);
      }
    },

    // 反射强度颜色映射
    getIntensityColor(index) {
      const value = this.intensity[index];
      const normalizedIntensity = Math.max(0, Math.min(1, value));
      const hueCold = 255; // 蓝色
      const hueHot = 0; // 红色
      const hue = hueCold + (hueHot - hueCold) * normalizedIntensity;
      return `hsl(${(hue + 360) % 360}, 100%, 50%)`;
    },

    // 语义颜色映射
    getSemanticColor(index) {
      const semId = this.semantics[index];
      const colorId = this.learning_map_inv[semId] || 0;
      const rgb = this.color_map[colorId] || [100, 100, 100];
      return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
    },

    // 实例颜色映射
    getInstanceColor(index) {
      const instanceId = this.instances[index];
      if (instanceId === 0) return '#888888';

      if (!this.instanceColorMap.has(instanceId)) {
        const hue = Math.random() * 360;
        this.instanceColorMap.set(instanceId, `hsl(${hue},100%,50%)`);
      }
      return this.instanceColorMap.get(instanceId);
    },

    // 更新可视化
    updateVisualization() {
      const visData = this.generateVisualizationData();
      console.log('可视化数据生成成功，正在渲染...');
      if (this.points.length > 0) {
        this.setOption(visData);
      }
      console.log('可视化数据渲染完成。');
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  background: #000;
  border: 1px solid #333;
  border-radius: 4px;
}
</style>
