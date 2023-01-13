<script setup>
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance();

import { useMessage } from 'naive-ui';
const message = useMessage();

const showPage = ref(false);
const ifToken = res => {
  if (res.code === 200) {
    showPage.value = true;
  } else {
    showPage.value = false;
    localStorage.removeItem('Authorization');
    if (res.message) {
      message.error(res.message);
    }
  }
};
</script>

<template>
  <NavRight @if-token="ifToken" ref="tableChart">
    <template #main>
      <section v-if="showPage"></section>
      <div v-else class="box">
        <NoAccess></NoAccess>
      </div>
    </template>
  </NavRight>
</template>

<style lang="less" scoped>
.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.table-chart) {
  height: 300px;
  width: 300px;
}
</style>
