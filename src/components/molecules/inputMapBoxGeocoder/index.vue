<script stupe lang="ts">
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useToolsMapbox } from "@stores/toolsMapbox";

setTimeout(() => {
  const geocoder = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS,
    types: "country,region,district,place,locality,neighborhood,address",
    language: "pt",
    proximity: {
      longitude: -46.633333,
      latitude: -23.55,
    },
    placeholder: "Busque um endereço",
  });

  geocoder.addTo("#geocoder");

  const toolsMapboxStore = useToolsMapbox();

  geocoder.on("result", (v) => {
    toolsMapboxStore.setResultSearchAddress(v);
  });

  geocoder.on("clear", () => {
    toolsMapboxStore.setResultSearchAddress("");
  });
}, 300);
</script>

<template>
  <div class="molecules-input-mapBoxGeocoder">
    <div id="geocoder"></div>
  </div>
</template>

<style lang="scss">
.mapboxgl-ctrl-geocoder {
  width: 100% !important;
}
</style>
