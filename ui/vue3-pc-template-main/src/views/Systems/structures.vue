<template>
  <div class="p-20 flex h-p-100 border-box over-hidden">
    <!-- <div class="el-card is-always-shadow w-200 mr-20 h-p-100 border-box over-hidden p-20">
      <CustomFilterTree :data="treeData" :treeProps="treeProps" @currentChange="handleTreeChange" :currentNodeKey="currentNodeKey" :defaultExpandedKeys="defaultExpandedKeys"></CustomFilterTree>
    </div> -->
    <div class="flex1">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="用户管理" name="third">用户管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="fourth"
          ><roleVue></roleVue
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import roleVue from "./components/role.vue";
// import CustomFilterTree from "@/components/CustomFilterTree/index.vue";
// import { treeData } from "./simulatedData.js";
const activeName = ref("fourth");
// const treeProps = {
//   children: "listTreeCustom",
//   label: "name",
//   id:'id',
//   isLeaf: "hasLeaf",
// };

// 以下默认选中和展开的节点为模拟数据，实际开发可以从缓存获取用户的组织id
// const currentNodeKey = 10000465
// const defaultExpandedKeys = [10000465]


// 当组织架构树结构选中节点发生改变时触发
// const handleTreeChange = (node) => {
//  console.log(node);
//   // 根据返回的不同的节点id从后台请求不同的表格数据
// }
</script>

<style lang="scss" scoped>
.w-200 {
  width: 200px;
}
.over-auto {
  overflow: auto;
}
</style>
