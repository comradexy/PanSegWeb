<template>
  <div class="grid-view">
    <el-row :gutter="20" class="grid-row">
      <el-col :span="24">
        <div class="grid-item">
          <h3>参数设置</h3>
          <el-row style="padding-left: 20px;">
            <el-form :inline="true" :model="paramConfig" class="param-config-form">
              <el-form-item>
                <el-button @click="submitParamConfig" style="width: 100px;">保存设置</el-button>
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
                <el-button style="width: 100px;">配置计算源</el-button>
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
      <el-col :span="8">
        <div class="grid-item">
          <h3>语义分割</h3>
          <el-table :data="semModels" style="width: 100%; margin-bottom: 10px;" max-height="500">
            <el-table-column fixed prop="modelName" label="模型" width="120" />
            <el-table-column prop="mIoU" label="精度 (%)" width="110" />
            <el-table-column prop="delay" label="延迟 (ms)" width="110" />
            <el-table-column prop="priority" label="优先级" width="80">
              <template #default="scope">
                <el-input v-model="scope.row.priority" />
              </template>
            </el-table-column>
            <el-table-column prop="active" label="启用">
              <template #default="scope">
                <el-switch v-model="scope.row.active"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  @change="changeActive(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-item">
          <h3>实例分割</h3>
          <el-table :data="instModels" style="width: 100%; margin-bottom: 10px;" max-height="500">
            <el-table-column fixed prop="modelName" label="模型" width="120" />
            <el-table-column prop="mIoU" label="精度 (%)" width="110" />
            <el-table-column prop="delay" label="延迟 (ms)" width="110" />
            <el-table-column prop="priority" label="优先级" width="80">
              <template #default="scope">
                <el-input v-model="scope.row.priority" />
              </template>
            </el-table-column>
            <el-table-column prop="active" label="启用">
              <template #default="scope">
                <el-switch v-model="scope.row.active"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  @change="changeActive(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-item">
          <h3>全景分割</h3>
          <el-table :data="panModels" style="width: 100%; margin-bottom: 10px;" max-height="500">
            <el-table-column fixed prop="modelName" label="模型" width="120" />
            <el-table-column prop="mIoU" label="精度 (%)" width="110" />
            <el-table-column prop="delay" label="延迟 (ms)" width="110" />
            <el-table-column prop="priority" label="优先级" width="80">
              <template #default="scope">
                <el-input v-model="scope.row.priority" />
              </template>
            </el-table-column>
            <el-table-column prop="active" label="启用">
              <template #default="scope">
                <el-switch v-model="scope.row.active"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
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
      log: '',
      semModels: [
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
      ],

      instModels: [
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
      ],

      panModels: [
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
        },
        {
          modelName: 'EPC-Net',
          mIoU: '68.8',
          delay: '273',
          priority: '1',
          active: true,
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
    async addSemModel() {
    },

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

.control-status {
  font-size: 14px;
  margin: 6px 8px;
  text-align: left;
}
</style>
