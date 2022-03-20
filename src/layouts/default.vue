<script setup lang="ts"></script>
<template>
  <div>
    <div class="default-layout">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  @apply w-screen h-screen bg-transparent overflow-hidden;
}
</style>
