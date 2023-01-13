<script setup>
import { useImageStore } from '../stores/imageStore';
const store = useImageStore();
</script>

<template>
  <NavRight>
    <template #main>
      <n-tabs size="large" type="line" animated>
        <n-tab-pane name="動畫" tab="動畫">
          <n-grid x-gap="20" :cols="4">
            <n-gi v-for="i in store.data" :key="i.title">
              <ImageCard
                :image-name="i.image"
                :card-title="i.title"
                card-text="Woobi_Dooggy"
              ></ImageCard></n-gi
          ></n-grid>
        </n-tab-pane>
        <n-tab-pane name="KPOP" tab="KPOP"> KPOP </n-tab-pane>
        <n-tab-pane name="抖音" tab="抖音"> 抖音最熱 </n-tab-pane>
      </n-tabs>
    </template>
  </NavRight>
</template>

<style lang="less" scoped>
.n-tab-pane {
  display: flex;
  .n-grid {
    padding-bottom: 5px;
  }
}
</style>
