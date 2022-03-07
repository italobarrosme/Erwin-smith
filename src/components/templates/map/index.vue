<script setup lang="ts">
import * as turf from "@turf/turf";
import { getCurrentInstance } from "vue";

const app = getCurrentInstance();

onBeforeMount(async () => {
  import("leaflet/dist/leaflet.css");
  const L = await import("leaflet");

  const VT = app?.appContext.config.globalProperties.$VT;
  console.log(turf, "turf");

  const mapAPI = L.map("map-default", {
    center: [-8.0535802, -34.9087328],
    zoom: 5,
    minZoom: 3,
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      maxZoom: 18,
      id: "italobarros1/ckzcre1w9002n14p9noyn1r01",
      tileSize: 512,
      accessToken: `pk.eyJ1IjoiaXRhbG9iYXJyb3MxIiwiYSI6ImNrd2wxMzA1bDF4b2EycHFpMXFxczcxMGgifQ.26TUCPnafdyBqowYP_kDKA`,
      zoomOffset: -1,
      minZoom: 3,
    }
  ).addTo(mapAPI);

  async function getStateForMap(state: string) {
    const geoJson = await import(
      `./../../../services/geoData/states/${state}.json`
    );

    const layer = L.geoJSON(geoJson.default);
    layer.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
    layer.setStyle({
      className: `polygon-map-${state}`,
    });

    geoJson.default.features.forEach((feature: any) => {
      console.log("here", feature);

      const cities = L.geoJSON(feature);
      cities.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
      cities
        .addTo(mapAPI)
        .on("click", (event: any) => {
          L.popup()
            .setLatLng(event.latlng)
            .setContent(
              `<div class="map-popup-container">
                  <div id="popup" class="-map-popup-title">
                  <ul>
                    <li>
                      <span>Cidade: </span> ${feature.properties.NOME}
                    </li>
                  </ul>
                  </div>
               </div>`
            )
            .openOn(mapAPI);
        })
        .on("mouseover", (e: any) => {
          cities.setStyle({
            className: `cities-map-${state}`,
            color: "#f10",
            fillColor: "#f10",
            fillOpacity: 0.3,
            weight: 1,
            opacity: 0.3,
          });
        })
        .on("mouseout", (event) => {
          cities.setStyle({
            className: `cities-map-${state}`,
            stroke: false,
            opacity: 0,
            fillOpacity: 0,
            weight: 1,
          });
        });
    });

    // layer
    //   .addTo(mapAPI)
    //   .on("click", (event: any) => {
    //     console.log(event.layer.feature.properties.name);
    //   })
    //   .on("mouseover", (event) => {
    //     layer.setStyle({
    //       stroke: true,
    //       color: "#f0f",
    //       weight: 1,
    //       fillColor: "#f0f",
    //       fillOpacity: 0.3,
    //       opacity: 0.3,
    //     });
    //   })
    //   .on("mouseout", (event) => {
    //     layer.setStyle({
    //       stroke: false,
    //       opacity: 0,
    //       fillOpacity: 0,
    //       weight: 1,
    //     });
    //   });

    const featureCollection = new VT(geoJson.default, {
      maxZoom: 18,
      tolerance: 50,
      bug: true,
      indexMaxPoints: 100000,
      className: `layer-polygon-${state}`,
      properties: "",
      zIndex: 850,
      pane: "tilePane",
      style: {
        color: "#0ff",
        fillColor: "#0ff",
        fillOpacity: 0.2,
        opacity: 0.2,
        weight: 0.05,
      },
    });

    featureCollection.addTo(mapAPI);
  }

  getStateForMap("PE");
  getStateForMap("PI");
  getStateForMap("AL");
  getStateForMap("BA");
  getStateForMap("CE");
  getStateForMap("MA");
  getStateForMap("PB");
  getStateForMap("RN");
  getStateForMap("SE");
});
</script>

<template>
  <main id="map-default"></main>
</template>

<style lang="scss">
#map-default {
  width: 100%;
  height: 100%;
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
