import * as echarts from 'echarts';
import 'echarts-gl';

// 初始化ECharts实例
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// 读取.bin文件并解析点云数据
function loadBinFile(url, callback) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      var data = new Float32Array(buffer);
      var points = [];
      for (var i = 0; i < data.length; i += 4) {
        points.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
      }
      callback(points);
    });
}

// 设置ECharts选项
function setOption(points) {
  option = {
    backgroundColor: '#000',
    title: {
      text: '3D Point Cloud Visualization',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {},
    xAxis3D: {
      type: 'value',
      min: -50,
      max: 50
    },
    yAxis3D: {
      type: 'value',
      min: -50,
      max: 50
    },
    zAxis3D: {
      type: 'value',
      min: -5,
      max: 10
    },
    grid3D: {
      show: false,
      boxWidth: 100, // x轴长度
      boxHeight: 15, // y轴长度
      boxDepth: 100, // z轴长度
      viewControl: {
        projection: 'perspective',
        distance: 100,
        minDistance: 10,
        maxDistance: 300
      }
    },
    series: [{
      type: 'scatter3D',
      data: points.map(point => ({
        value: [point[0], point[1], point[2]],
        itemStyle: {
          color: getColor(point[3])
        }
      })),
      symbolSize: 1.2
    }]
  };
  myChart.setOption(option);
}


// 根据反射强度获取热力图颜色
function getColor(intensity) {
  // var colorScale = [
  //   '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff'
  // ];
  // var index = Math.min(Math.floor(intensity * colorScale.length), colorScale.length - 1);
  // return colorScale[index];

  // 将反射强度映射到0~1之间
  var normalizedIntensity = Math.max(0, Math.min(1, intensity));

  // 使用HSL颜色空间，定义冷色调（蓝色）和暖色调（红色）的Hue值
  var hueCold = 240; // 蓝色
  var hueHot = 0; // 红色

  // 计算当前颜色的Hue值，使用线性插值
  var hue = hueCold + (hueHot - hueCold) * normalizedIntensity;

  // 将Hue值调整到0~360之间
  hue = (hue + 360) % 360;

  // 饱和度和亮度固定，可以根据需要调整
  var saturation = 100; // 饱和度
  var lightness = 50; // 亮度

  // 使用HSL颜色表示
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}

// 加载并解析点云数据
loadBinFile('src/000000.bin', setOption);
