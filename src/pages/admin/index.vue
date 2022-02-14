<script setup lang="ts"></script>

<template>
  <div>
    <el-tabs :tab-position="'top'" style="height: 200px" type="card">
      <el-tab-pane label="Users">
        <div>
          <AdminUsersList class="col-span-3 pb-16" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Categories">
        <div class="grid grid-cols-5 items-start gap-12">
          <AdminCategoriesList class="col-span-3 pb-16" />
          <AdminCreateCategoryForm class="col-span-2" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped></style>
