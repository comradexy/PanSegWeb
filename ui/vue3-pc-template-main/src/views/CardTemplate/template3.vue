<template>
  <el-scrollbar class="container">

    <el-row :gutter="20" class="grid-row">
      <el-col :span="9">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">
            <el-icon size="24" style="vertical-align:text-bottom; padding-right: 5px;">
              <Cpu />
            </el-icon>
            CPU
          </el-text>
          <el-divider class="title-divider" />
          <div class="sub-item">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-table :data="cpuData" style="width: 100%; margin-bottom: 10px">
                  <el-table-column prop="attr" label="属性" style="width: 50%;" />
                  <el-table-column prop="value" label="值" />
                </el-table>
              </el-col>
              <el-col :span="8" style="align-content: center;">
                <el-progress type="dashboard" :percentage="22.33" :color="progressColor" :width="160"
                  :stroke-width="16">
                  <template #default="{ percentage }">
                    <p class="percentage-value">{{ percentage }}%</p>
                    <p class="percentage-label">使用率</p>
                  </template>
                </el-progress>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>

      <el-col :span="15">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">
            <el-icon size="24" style="vertical-align:text-bottom; padding-right: 5px;">
              <Memo />
            </el-icon>
            内存
          </el-text>
          <el-divider class="title-divider" />
          <div class="sub-item">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-table :data="memData" style="width: 100%; margin-bottom: 10px">
                  <el-table-column prop="attr" label="属性"></el-table-column>
                  <el-table-column prop="memVal" label="内存"></el-table-column>
                  <el-table-column prop="jvmVal" label="JVM"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="5" style="align-content: center;">
                <el-progress type="dashboard" :percentage="34.83" :color="progressColor" :width="160"
                  :stroke-width="16">
                  <template #default="{ percentage }">
                    <p class="percentage-value">{{ percentage }}%</p>
                    <p class="percentage-label">总内存</p>
                  </template>
                </el-progress>
              </el-col>
              <el-col :span="5" style="align-content: center;">
                <el-progress type="dashboard" :percentage="64.75" :color="progressColor" :width="160"
                  :stroke-width="16">
                  <template #default="{ percentage }">
                    <p class="percentage-value">{{ percentage }}%</p>
                    <p class="percentage-label">JVM</p>
                  </template>
                </el-progress>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="grid-row">
      <el-col :span="24">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">
            <el-icon size="24" style="vertical-align:text-bottom; padding-right: 5px;">
              <Monitor />
            </el-icon>
            服务器信息
          </el-text>
          <el-divider class="title-divider" />
          <div class="sub-item">
            <el-table :data="serverData" style="margin-bottom: 10px">
              <el-table-column label="服务器名称" prop="name" style="width: 25%;" />
              <el-table-column label="操作系统" prop="opSys" style="width: 25%;"/>
              <el-table-column label="服务器IP" prop="serverIp" style="width: 25%;" />
              <el-table-column label="系统架构" prop="opArch" style="width: 25%;"/>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="grid-row">
      <el-col :span="24">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">
            <el-icon size="24" style="vertical-align:text-bottom; padding-right: 5px;">
              <CoffeeCup />
            </el-icon>
            Java虚拟机信息
          </el-text>
          <el-divider class="title-divider" />
          <div class="sub-item">
            <el-table :data="javaData" style="margin-bottom: 10px">
              <el-table-column label="Java名称" prop="name" width="160" />
              <el-table-column label="Java版本" prop="version" width="100"/>
              <el-table-column label="启动时间" prop="startTime" width="180" />
              <el-table-column label="运行时间" prop="runtime" width="140" />
              <el-table-column label="安装路径" prop="installPath" width="200" />
              <el-table-column label="项目路径" prop="projPath" width="200" />
              <el-table-column label="运行参数" prop="params" />
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="grid-row">
      <el-col :span="24">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">
            <el-icon size="24" style="vertical-align:text-bottom; padding-right: 5px;">
              <MessageBox />
            </el-icon>
            磁盘信息
          </el-text>
          <el-divider class="title-divider" />
          <div class="sub-item">
            <el-table :data="namingData">
              <el-table-column prop="drivePath" label="盘符路径" width="120" />
              <el-table-column prop="fileSystem" label="文件系统" />
              <el-table-column prop="driveType" label="盘符类型" />
              <el-table-column prop="max" label="最大值" />
              <el-table-column prop="available" label="可用大小" />
              <el-table-column prop="usedSize" label="已用大小" />
              <el-table-column prop="usedPercent" label="已用百分比" />
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      progressColor: '#2f5597',
      cpuData: [
        { attr: '核心数', value: '2' },
        { attr: '用户使用率', value: '0.5%' },
        { attr: '系统使用率', value: '22.33%' },
        { attr: '当前空闲率', value: '77.77%' }
      ],
      memData: [
        { attr: '总内存', memVal: '7.31G', jvmVal: '509M' },
        { attr: '已用内存', memVal: '2.55G', jvmVal: '329.59M' },
        { attr: '剩余', memVal: '4.76G', jvmVal: '179.41M' },
        { attr: '使用率', memVal: '34.83%', jvmVal: '64.75%' }
      ],
      serverData:[{
        name: 'iZwz72qw4xmd91lt1s0df9Y',
        opSys: 'Linux',
        serverIp: '172.24.10.106',
        opArch: 'amd64',
      }],
      javaData: [{
        name: 'Java HotSpot(TM) 64-Bit Server VM',
        version: '1.8.0_111',
        startTime: '2025-03-11 18:07:50',
        runtime: '4天6小时24分钟',
        installPath: '/usr/java/jdk1.8.0_111/jre',
        projPath: '/home/dxy/projects/pcss',
        params: '[-Xms512m, -Xmx1024m, -XX:MetaspaceSize=128m, -XX:MaxMetaspaceSize=512m, -XX:+HeapDumpOnOutOfMemoryError, -XX:+PrintGCDateStamps, -XX:+PrintGCDetails, -XX:NewRatio=1, -XX:SurvivorRatio=30, -XX:+UseParallelGC, -XX:+UseParallelOldGC]' // 简写参数
      }],
      namingData: [{
        drivePath: '/',
        fileSystem: 'ext4',
        driveType: '/',
        max: '39.2 GB',
        available: '21.4 GB',
        usedSize: '17.8 GB',
        usedPercent: '48.40%'
      }]
    };
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  width: 100%;
  margin: 0 auto;
}

.grid-row {
  padding: 0;
  margin-bottom: 20px;
}

.grid-item {
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.sub-item {
  padding: 10px;
  height: 85%;
}

.grid-item-title {
  color: #303133;
  font-size: large;
}

.title-divider {
  margin: 8px 0 0;
}
</style>
