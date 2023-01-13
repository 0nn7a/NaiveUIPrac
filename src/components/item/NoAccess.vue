<script setup>
const router = useRouter();
const goBackBtn = async () => {
  await router.push({ name: 'home' });
  await router.go(0);
};
</script>

<template>
  <n-result
    status="403"
    title="權限不足"
    description="您尚未登入，請於登入後訪問"
  >
    <template #footer>
      <n-button @click="goBackBtn">回首頁</n-button>
    </template>
  </n-result>
</template>

<style lang="less" scoped></style>
