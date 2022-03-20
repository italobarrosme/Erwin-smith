<script setup lang="ts">
import { renderMap } from "@/composables/useMap";

onBeforeMount(async () => {
  renderMap();
});
</script>

<template>
  <main id="map-default"></main>
</template>

<style lang="scss">
#map-default {
  @apply relative w-full h-full;
}
.leaflet-popup-content {
  @apply p-0 flex justify-start items-center h-auto min-w-[124px];
  margin: 10px !important;
}
.map-popup-container {
  @apply flex p-0;
}

.-map-popup-title {
  @apply text-[12px] text-gray-900;
  > ul {
    list-style-type: none;
    > li {
      > span {
        @apply text-brand-secondary-darkest;
        font-weight: 700;
      }
      @apply py-1;
    }
  }
}
.leaflet-popup-content-wrapper {
  border-radius: 8px !important;
  border-left: solid 10px #00746b;
  min-height: 58px;
  height: auto !important;
}
</style>
