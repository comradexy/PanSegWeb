import * as echarts from 'echarts';
import 'echarts-gl';

document.addEventListener('DOMContentLoaded', function () {
  // 初始化ECharts实例
  var chartDom = document.getElementById('pcd_vis_container');
  var myChart = echarts.init(chartDom);
  var option;

  // 读取.bin文件并解析点云数据
  function loadBinFile(url, callback) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        var data = new Float32Array(buffer);
        var points = parseBinFile(data);
        callback(points);
      });
  }

  // 解析.bin文件和点云数据
  function parseBinFile(data) {
    var points = [];
    for (var i = 0; i < data.length; i += 4) {
      var point = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      points.push(point);
    }
    return points;
  }

  // 设置ECharts选项
  function setOption(points) {
    option = {
      backgroundColor: '#fff',
      title: {
        // text: '3D Point Cloud Visualization',
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
        symbolSize: 2.0
      }]
    };
    myChart.setOption(option);
  }


  // 根据某个特征值获取热力图颜色
  function getColor(value) {
    // var colorScale = [
    //   '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff'
    // ];
    // var index = Math.min(Math.floor(intensity * colorScale.length), colorScale.length - 1);
    // return colorScale[index];

    // 将反射强度映射到0~1之间
    var normalizedIntensity = Math.max(0, Math.min(1, value));

    // 使用HSL颜色空间，定义冷色调（蓝色）和暖色调（红色）的Hue值
    var hueCold = 255; // 蓝色
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
  // loadBinFile('src/000000.bin', setOption);

  // 上传点云文件，并可视化
  var upload_pcd_button = document.getElementById('upload_pcd_button');
  // 点击上传按钮后弹出文件选择框，
  // 并调用loadBinFile函数，可视化点云数据
  upload_pcd_button.addEventListener('click', function () {
    // 弹出文件选择框
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bin';
    input.onchange = function (e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      // 读取文件内容
      reader.onload = function (e) {
        var data = new Float32Array(e.target.result);
        var points = parseBinFile(data);
        setOption(points);
      };
      reader.readAsArrayBuffer(file);
    };

    // 触发文件选择框
    input.click();
  })

});
