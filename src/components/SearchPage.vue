<script setup>
import { useImageStore } from '../stores/imageStore';
import NoAccess from './item/NoAccess.vue';

import { useMessage } from 'naive-ui';
const message = useMessage();

const store = useImageStore();
function getImageUrl(name) {
  return new URL(`/src/assets/${name}.jpg`, import.meta.url).href;
}

const showPage = ref(false);
const ifToken = res => {
  if (res.code === 200) {
    showPage.value = true;
  } else {
    showPage.value = false;
    // localStorage.removeItem('Authorization');
    if (res.message) {
      message.error(res.message);
    }
  }
};
</script>

<template>
  <NavRight @if-token="ifToken">
    <template #main>
      <section v-if="showPage">
        <n-divider />
        <header>
          <h2>瀏覽全部</h2>
          <n-input placeholder="🔍 想聽什麼？" round clearable />
        </header>
        <div class="list">
          <div class="item" v-for="i in store.searchImages" :key="i">
            <img :src="getImageUrl(i)" alt="#" />
          </div>
        </div>
      </section>
      <div v-else class="box">
        <NoAccess></NoAccess>
      </div>
    </template>
  </NavRight>
</template>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
}
.n-divider {
  margin-top: 0px;
  margin-bottom: 20px;
}
.n-input {
  width: 250px;
  margin-bottom: 15px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  .item {
    //background-color: #3d3d3d;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
}

.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
