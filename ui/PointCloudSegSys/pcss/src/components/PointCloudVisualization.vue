<template>
    <div class="point-cloud-visualization">
      <h2>SemanticKITTI点云可视化</h2>
  
      <!-- 点云序号选择 -->
      <div class="frame-selector">
        <label>点云序号：</label>
        <input
          type="text"
          v-model="frameId"
          placeholder="请输入6位序号，如000123"
          maxlength="6"
        />
        <button @click="loadFrame">加载点云</button>
      </div>
  
      <!-- 可视化容器 -->
      <div ref="chart" class="chart-container"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import 'echarts-gl';
  import semanticConfig from '../assets/semantic-kitti.json'; // 转换后的配置文件
  
  export default {
    name: 'PointCloudVisualization',
    data() {
      return {
        chart: null,
        frameId: '', // 点云序号
        points: [], // 点云坐标 [x, y, z]
        semantics: [], // 语义标签
  
        // 从配置中提取的映射关系
        learning_map: semanticConfig.learning_map,
        learning_map_inv: semanticConfig.learning_map_inv,
        color_map: semanticConfig.color_map,
      };
    },
    mounted() {
      this.initChart();
      window.addEventListener('resize', this.resizeChart);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.resizeChart);
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.chart);
        this.setOption([]); // 初始空数据
      },
  
      setOption(points) {
        const option = {
          backgroundColor: '#000',
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
                value: [point.value[0], point.value[1], point.value[2]],
                itemStyle: {
                  color: point.color,
                },
              })),
              symbolSize: 1.2,
            },
          ],
        };
  
        this.chart.setOption(option, true);
      },
  
      // RGB数组转十六进制
      rgbToHex(rgbArray) {
        return `#${rgbArray.map((v) =>
          v.toString(16).padStart(2, '0')
        ).join('')}`;
      },
  
      // 加载点云和标签文件
      async loadFrame() {
        if (!this.frameId || this.frameId.length !== 6) {
          alert('请输入6位点云序号');
          return;
        }
  
        try {
          // 加载点云文件
          const pcdUrl = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.bin`;
          const pcdResponse = await fetch(pcdUrl);
          const pcdBuffer = await pcdResponse.arrayBuffer();
          const pcdData = new Float32Array(pcdBuffer);
          this.points = this.parseBinData(pcdData);
  
          // 加载标签文件
          const labelUrl = `https://escapist-bucket-dev.oss-cn-hangzhou.aliyuncs.com/${this.frameId}.label`;
          const labelResponse = await fetch(labelUrl);
          const labelBuffer = await labelResponse.arrayBuffer();
          const labelData = new Uint32Array(labelBuffer);
          this.parseLabelData(labelData);
  
          // 更新可视化
          this.updateVisualization();
        } catch (error) {
          console.error('加载文件失败:', error);
          alert('加载文件失败，请检查序号是否正确');
        }
      },
  
      // 解析点云数据
      parseBinData(data) {
        const points = [];
        for (let i = 0; i < data.length; i += 4) {
          points.push([data[i], data[i + 1], data[i + 2]]);
        }
        return points;
      },
  
      // 解析标签数据
      parseLabelData(data) {
        this.semantics = [];
        data.forEach((label) => {
          const raw_sem = label & 0xffff; // 原始语义标签
          const valid_sem = this.learning_map[raw_sem] || 0; // 应用learning_map
          this.semantics.push(valid_sem);
        });
      },
  
      // 生成可视化数据
      generateVisualizationData() {
        return this.points.map((point, index) => ({
          value: [point[0], point[1], point[2]],
          color: this.getSemanticColor(index),
        }));
      },
  
      // 获取语义颜色
      getSemanticColor(index) {
        const semId = this.semantics[index];
        const remappedId = this.learning_map_inv[semId] || 0;
        const rgb = this.color_map[remappedId] || [100, 100, 100];
        return this.rgbToHex(rgb);
      },
  
      updateVisualization() {
        if (this.points.length > 0 && this.semantics.length > 0) {
          const visData = this.generateVisualizationData();
          this.setOption(visData);
        }
      },
  
      resizeChart() {
        if (this.chart) {
          this.chart.resize();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .point-cloud-visualization {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .frame-selector {
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .frame-selector input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .frame-selector button {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .frame-selector button:hover {
    background-color: #3aa876;
  }
  
  .chart-container {
    width: 800px;
    height: 600px;
    border: 1px solid #ddd;
  }
  </style>