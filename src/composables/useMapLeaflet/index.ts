import * as turf from "@turf/turf";
// import { VTgeoJson } from "./vtGeoJson";
import * as vt from "./vtGeoJson";

import * as deckCore from "@deck.gl/core";
import * as deckLayers from "@deck.gl/layers";
import { LeafletLayer } from "deck.gl-leaflet";

export async function renderMapLeaflet() {
  console.log(deckCore, "deckCore");
  console.log(deckLayers, "deckLayers");

  import("leaflet/dist/leaflet.css");
  const L = await import("leaflet");
  const vtConstructor = await vt.VtGeoJson();

  console.log(turf, "turf");

  const mapAPI = L.map("map-default", {
    center: [-8.0535802, -34.9087328],
    zoom: 6,
    minZoom: 6,
    maxZoom: 18,
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      maxZoom: 18,
      id: "italobarros1/cl0nw20po002r14neu9kepgod",
      tileSize: 512,
      accessToken: `pk.eyJ1IjoiaXRhbG9iYXJyb3MxIiwiYSI6ImNrd2wxMzA1bDF4b2EycHFpMXFxczcxMGgifQ.26TUCPnafdyBqowYP_kDKA`,
      zoomOffset: -1,
      minZoom: 3,
    }
  ).addTo(mapAPI);

  async function getStateForMap(
    state: string,
    color: string,
    colorHover: string
  ) {
    const geoJson = await import(
      `./../../services/geoData/states/${state}.json`
    );

    // ----------------------------------------------------------------- LEAFLET WITH DECK GL

    const layer = new LeafletLayer({
      layers: [
        new deckLayers.GeoJsonLayer({
          id: "polygon-layer",
          data: geoJson.features,
          pickable: true,
          stroked: true,
          filled: true,
          wireframe: true,
          lineWidthMinPixels: 1,
          getPolygon: (d) => d.contour,
          getElevation: (d) => 500,
          getFillColor: (d) => [0, 0, 0, 100],
          getLineColor: [80, 80, 80],
          getLineWidth: 1,
        }),
      ],
    });

    layer.addTo(mapAPI);

    // ----------------------------------------------------------------- LEAFLET VT GEOJSON

    // const layer = L.geoJSON(geoJson.default);
    // layer.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
    // layer.setStyle({
    //   className: `polygon-map-${state}`,
    // });

    // geoJson.default.features.forEach((feature: any) => {
    //   const cities = L.geoJSON(feature);
    //   cities.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
    //   cities
    //     .addTo(mapAPI)
    //     .on("click", (event: any) => {
    //       mapAPI.setView(event.latlng, mapAPI.getZoom() + 2);

    //       L.popup()
    //         .setLatLng(event.latlng)
    //         .setContent(
    //           `<div class="map-popup-container">
    //                   <div id="popup" class="-map-popup-title">
    //                   <ul>
    //                     <li>
    //                       <span>Cidade: </span> ${feature.properties.NOME}
    //                     </li>
    //                   </ul>
    //                   </div>
    //                </div>`
    //         )
    //         .openOn(mapAPI);

    //       cities.setStyle({
    //         fillColor: color,
    //         fillOpacity: 0.5,
    //         color: color,
    //         opacity: 0.5,
    //       });
    //     })
    //     .on("mouseover", (e: any) => {
    //       cities.setStyle({
    //         className: `cities-map-${state}`,
    //         color: colorHover,
    //         fillColor: colorHover,
    //         fillOpacity: 0.3,
    //         weight: 1,
    //         opacity: 0.3,
    //       });
    //     })
    //     .on("mouseout", (event) => {
    //       cities.setStyle({
    //         className: `cities-map-${state}`,
    //         stroke: false,
    //         opacity: 0,
    //         fillOpacity: 0,
    //         weight: 1,
    //       });
    //     });
    // });

    // const featureCollection = new vtConstructor(geoJson.default, {
    //   maxZoom: 18,
    //   tolerance: 50,
    //   bug: true,
    //   className: `layer-polygon-${state}`,
    //   properties: "",
    //   zIndex: 850,
    //   stroke: false,
    //   style: {
    //     color: color,
    //     fillColor: color,
    //     fillOpacity: 0.4,
    //     opacity: 1,
    //     weight: 0.8,
    //   },
    // });

    // featureCollection.addTo(mapAPI);
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
