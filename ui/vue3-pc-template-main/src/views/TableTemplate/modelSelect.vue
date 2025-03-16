<template>
  <div class="grid-view">
    <el-row :gutter="20" class="grid-row">
      <el-col :span="24">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">参数设置</el-text>
          <el-divider class="title-divider" />
          <el-row style="padding-left: 20px; padding-top: 10px;">
            <el-form :inline="true" :model="paramConfig" class="param-config-form">
              <el-form-item>
                <el-button @click="submitParamConfig" style="width: 100px;" color="#2f5597">保存设置</el-button>
              </el-form-item>
              <el-form-item label="Batch Size">
                <el-input v-model="paramConfig.batchSize" placeholder="默认: 1" clearable />
              </el-form-item>
              <el-form-item label="GPUs">
                <el-input v-model="paramConfig.numGpus" placeholder="默认: 1" clearable />
              </el-form-item>
              <el-form-item label="线程数">
                <el-input v-model="paramConfig.numThreads" placeholder="默认: 1" clearable />
              </el-form-item>
              <el-form-item label="内存限制 (GB)">
                <el-input v-model="paramConfig.memLimit" placeholder="默认: 16" clearable />
              </el-form-item>
              <el-form-item label="显存限制 (GB)">
                <el-input v-model="paramConfig.disMemLimit" placeholder="默认: 16" clearable />
              </el-form-item>
            </el-form>
          </el-row>
          <el-row style="padding-left: 20px;">
            <el-form :inline="true" :model="modelSource" class="model-source">
              <el-form-item>
                <el-button style="width: 100px;" color="#2f5597">配置计算源</el-button>
              </el-form-item>
              <el-form-item label="IP地址">
                <el-input v-model="modelSource.ip" placeholder="例如：127.0.0.1"></el-input>
              </el-form-item>
              <el-form-item label="端口号">
                <el-input v-model="modelSource.port" placeholder="例如：8888"></el-input>
              </el-form-item>
              <el-form-item label="根路径">
                <el-input v-model="modelSource.path" placeholder="例如：/root"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="grid-row">
      <el-col :span="12">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">语义分割</el-text>
          <el-divider class="title-divider" />
          <el-table :data="semModels" style="width: 100%; margin-bottom: 10px;" max-height="500">
            <el-table-column fixed prop="modelName" label="模型" style="width: 20%;" />
            <el-table-column prop="mIoU" label="精度 (%)" style="width: 20%;" />
            <el-table-column prop="delay" label="延迟 (ms)" style="width: 20%;" />
            <el-table-column prop="priority" label="优先级" style="width: 20%;">
              <template #default="scope">
                <el-input v-model="scope.row.priority" style="padding-right: 50px;" />
              </template>
            </el-table-column>
            <el-table-column prop="active" label="启用" style="width: 20%;">
              <template #default="scope">
                <el-switch v-model="scope.row.active"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #d0d0d0"
                  @change="changeActive(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-item">
          <el-text tag="b" class="grid-item-title">全景分割</el-text>
          <el-divider class="title-divider" />
          <el-table :data="panModels" style="width: 100%; margin-bottom: 10px;" max-height="500">
            <el-table-column fixed prop="modelName" label="模型" style="width: 20%;" />
            <el-table-column prop="pq" label="精度 (%)" style="width: 20%;" />
            <el-table-column prop="delay" label="延迟 (ms)" style="width: 20%;" />
            <el-table-column prop="priority" label="优先级" style="width: 20%;">
              <template #default="scope">
                <el-input v-model="scope.row.priority" style="padding-right: 50px;" />
              </template>
            </el-table-column>
            <el-table-column prop="active" label="启用" style="width: 20%;">
              <template #default="scope">
                <el-switch v-model="scope.row.active"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #d0d0d0"
                  @change="changeActive(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ModelSelect',

  data() {
    return {
      semModels: [
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'SPVNAS',
          mIoU: '66.4',
          delay: '259',
          priority: '1',
          active: false,
        },
        {
          modelName: 'MinkowskiNet',
          mIoU: '63.1',
          delay: '294',
          priority: '1',
          active: false,
        },
        {
          modelName: 'RandLA-Net',
          mIoU: '53.9',
          delay: '880',
          priority: '1',
          active: false,
        },
        {
          modelName: 'PVCNN',
          mIoU: '39.0',
          delay: '146',
          priority: '1',
          active: false,
        },
        {
          modelName: 'SalsaNext',
          mIoU: '59.5',
          delay: '71',
          priority: '1',
          active: true,
        },
        {
          modelName: 'PolarNet',
          mIoU: '57.2',
          delay: '62',
          priority: '1',
          active: false,
        },
      ],
      panModels: [
        {
          modelName: 'FP3Seg',
          pq: '57.7',
          delay: '317',
          priority: '1',
          active: true,
        },
        {
          modelName: 'CPSeg',
          pq: '56.9',
          delay: '70',
          priority: '1',
          active: true,
        },
        {
          modelName: 'SMAC-Seg',
          pq: '56.1',
          delay: '99',
          priority: '1',
          active: false,
        },
        {
          modelName: 'GP-S3Net',
          pq: '60.0',
          delay: '270',
          priority: '1',
          active: false,
        },
        {
          modelName: 'EfficientLPS',
          pq: '57.4',
          delay: '213',
          priority: '1',
          active: false,
        },
        {
          modelName: 'DS-Net',
          pq: '55.9',
          delay: '294',
          priority: '1',
          active: false,
        },
        {
          modelName: 'LPSAD',
          pq: '38.0',
          delay: '85',
          priority: '1',
          active: false,
        },
      ],

      paramConfig: {
        batchSize: 1,
        numGpus: 1,
        numThreads: 1,
        memLimit: 16,
        disMemLimit: 16,
      },

      modelSource: {
        ip: '127.0.0.1',
        port: '8888',
        path: '/model',
      },
    };
  },

  mounted() {

  },

  methods: {
    async submitParamConfig() {

    },

    async changeActive(active) {
      if (active) {
        active = false;
      } else {
        active = true;
      }
    }

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
  /* height: 100%; */
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

.grid-item-title {
  color: #303133;
  font-size: large;
}

.title-divider {
  margin: 8px 0 12px;
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
