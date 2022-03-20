<script setup lang="ts"></script>

<template>
  <router-view class="prose" />
</template>

<style lang="scss">
:root {
  --width-scroll: 8px;
  --color-scroll-thumb: #00a19c;
  --color-scroll-track: #fbfbfb;
  --border: 8px;
}
body {
  ::-webkit-scrollbar {
    width: var(--width-scroll);
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--color-scroll-track);
    border-radius: var(--border);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--color-scroll-thumb);
    border-radius: var(--border);
  }
}
</style>
