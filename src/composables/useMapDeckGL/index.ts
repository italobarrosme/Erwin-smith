import * as turf from "@turf/turf";
import * as deckCore from "@deck.gl/core";
import * as deckLayers from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export async function renderMapDeckGL() {
  console.log(deckCore, "deckCore");
  console.log(deckLayers, "deckLayers");

  mapboxgl.accessToken =
    "pk.eyJ1IjoiaXRhbG9iYXJyb3MxIiwiYSI6ImNrd2wxMzA1bDF4b2EycHFpMXFxczcxMGgifQ.26TUCPnafdyBqowYP_kDKA";

  const map = new mapboxgl.Map({
    container: "map-default", // container ID,
    style: "mapbox://styles/italobarros1/cl0nw20po002r14neu9kepgod", // style URL
    center: [-34.900002, -8.05],
    zoom: 6, // starting zoom
    antialias: true, // Mapbox disables WebGL's antialiasing by default
    minZoom: 6,
    maxZoom: 9,
  });

  async function getStateForMap(
    state: string,
    color: string,
    colorHover: string
  ) {
    const geoJson = await import(
      `./../../services/geoData/states/${state}.json`
    );

    const myDeckLayer = new MapboxLayer({
      id: "my-layer",
      type: deckLayers.GeoJsonLayer,
      data: geoJson.features,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.contour,
      getElevation: (d) => 500,
      getFillColor: (d) => [0, 0, 0, 100],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
    });

    console.log(map, "MAP");

    map.on("load", () => {
      map.addLayer(myDeckLayer);
    });
  }

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
