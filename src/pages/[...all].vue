<script setup lang="ts">
const router = useRouter();
onBeforeMount(() => {
  router.replace("/signin");
});
</script>

<template>
  <div>
    <loader />
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
