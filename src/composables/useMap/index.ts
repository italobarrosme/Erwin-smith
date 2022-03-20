import * as turf from "@turf/turf";
// import { VTgeoJson } from "./vtGeoJson";
import * as vt from "./vtGeoJson";

export async function renderMap() {
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

    const layer = L.geoJSON(geoJson.default);
    layer.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
    layer.setStyle({
      className: `polygon-map-${state}`,
    });

    geoJson.default.features.forEach((feature: any) => {
      const cities = L.geoJSON(feature);
      cities.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
      cities
        .addTo(mapAPI)
        .on("click", (event: any) => {
          mapAPI.setView(event.latlng, mapAPI.getZoom() + 2);

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

          cities.setStyle({
            fillColor: color,
            fillOpacity: 0.5,
            color: color,
            opacity: 0.5,
          });
        })
        .on("mouseover", (e: any) => {
          cities.setStyle({
            className: `cities-map-${state}`,
            color: colorHover,
            fillColor: colorHover,
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

    const featureCollection = new vtConstructor(geoJson.default, {
      maxZoom: 18,
      tolerance: 50,
      bug: true,
      indexMaxPoints: 100000,
      className: `layer-polygon-${state}`,
      properties: "",
      zIndex: 850,
      pane: "tilePane",
      stroke: false,
      style: {
        color: color,
        fillColor: color,
        fillOpacity: 0.4,
        opacity: 1,
        weight: 0.8,
      },
    });

    featureCollection.addTo(mapAPI);
  }

  getStateForMap("PI", "#00CCBF", "#f9f9f9");
  getStateForMap("PE", "#FF5F5D", "#f9f9f9");
  // getStateForMap("AL", "#0f0", "#f9f9f9");
  // getStateForMap("BA", "#FFD700", "#f9f9f9");
  // getStateForMap("CE", "#FFD700", "#f9f9f9");
  // getStateForMap("MA", "#FFD700", "#f9f9f9");
  // getStateForMap("PB", "#FFD700", "#f9f9f9");
  // getStateForMap("RN", "#FFD700", "#f9f9f9");
  // getStateForMap("SE", "#FFD700", "#f9f9f9");
}
