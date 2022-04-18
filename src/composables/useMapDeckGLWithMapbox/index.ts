// import * as turf from "@turf/turf";
import * as deckCore from "@deck.gl/core";
import * as deckLayers from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useToolsMapbox } from "@/stores/toolsMapbox";

export async function renderMapDeckGL() {
  const toolsMapboxStore = useToolsMapbox();
  console.log(deckCore, "deckCore");
  console.log(deckLayers, "deckLayers");

  const currentMarkers = ref<any>([]);

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS;

  const map = new mapboxgl.Map({
    container: "map-default", // container ID,
    style: "mapbox://styles/italobarros1/cl0nw20po002r14neu9kepgod",
    center: [-34.900002, -8.05],
    zoom: 6,
    antialias: true,
    minZoom: 6,
    maxZoom: 16,
    pitch: 40,
    dragRotate: false,
  });

  async function getStateForMap(
    state: string,
    color: string,
    colorHover: string
  ) {
    const geoJson = await import(
      `./../../services/geoData/states/${state}.json`
    );

    console.log(map, "MAP");

    const myDeckLayer = new MapboxLayer({
      id: "geojson-layer",
      type: deckLayers.GeoJsonLayer,
      data: geoJson.features,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.contour,
      getElevation: (d) => (d.properties.name === "Recife" ? 300 : 0),
      getFillColor: (d) => [0, 0, 0, 40],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
    });

    map.on("load", () => {
      map.addLayer(myDeckLayer);
    });
    map.on("mousemove", (event) => {
      map.getLayer("geojson-layer");
    });
  }

  watch(
    () => toolsMapboxStore.getResultSearchAddress,
    (newValue, oldValue) => {
      if (newValue) {
        var oneMarker = new mapboxgl.Marker(newValue)
          .setLngLat(newValue.result.center)
          .addTo(map);
        map.flyTo({
          center: newValue.result.center,
          zoom: 18,
          speed: 1,
          curve: 1,
        });
        currentMarkers.value.push({
          marker: oneMarker,
          name: newValue.result.place_name,
        });
        if (currentMarkers.value.length > 0) {
          currentMarkers.value.forEach((el) => {
            if (el.name !== newValue.result.place_name) {
              el.marker.remove();
            }
          });
        }
      }
    }
  );

  // getStateForMap("PI", "#00CCBF", "#f9f9f9");
  getStateForMap("PE", "#00CCBF", "#f9f9f9");
  // getStateForMap("AL", "#00CCBF", "#f9f9f9");
  // getStateForMap("BA", "#00CCBF", "#f9f9f9");
  // getStateForMap("CE", "#00CCBF", "#f9f9f9");
  // getStateForMap("MA", "#00CCBF", "#f9f9f9");
  // getStateForMap("PB", "#00CCBF", "#f9f9f9");
  // getStateForMap("RN", "#00CCBF", "#f9f9f9");
  // getStateForMap("SE", "#00CCBF", "#f9f9f9");
}
