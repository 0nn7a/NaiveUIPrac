<script setup>
const props = defineProps({
  imageName: String,
  cardTitle: String,
  cardText: String,
});
function getImageUrl(name) {
  return new URL(`/src/assets/${name}.jpg`, import.meta.url).href;
}
</script>

<template>
  <n-card :bordered="true" hoverable>
    <template #cover>
      <img :src="getImageUrl(props.imageName)" alt="#" />
    </template>
    <h3>{{ props.cardTitle }}</h3>
    <p>{{ props.cardText }}</p>
  </n-card>
</template>

<style lang="less" scoped>
.n-card {
  margin: 10px 0;
  background-color: rgba(237, 237, 237, 0.3);
  h3 {
    margin-top: 20px;
    margin-bottom: 5px;
  }
  p {
    color: darkgrey;
  }
}
</style>
