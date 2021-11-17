import React, { useState, useEffect } from "react";
import mapboxgl from "maplibre-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-draw/dist/mapbox-gl-draw.css";

//Load Components
import LayersControls from './components/LayersControls'
import addControls from "./components/addControls"
import addTMSLayers from "./components/addTMSLayers"
import addJSONLayers from "./components/addJSONLayers"
import addWMSLayers from "./components/addWMSLayers"

const baseStyle = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const darkStyle = "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

const vibs = "none";

const App = () => {
  const [Map, setMap] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [darkStyle],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 14,
          },
        ],
      },
      center: [100.496712, 13.752725],
      zoom: 5,
      minzoom: 0,
      maxzoom: 22,
    });

    addControls(map)
    map.on(`load`, (e) => {
      setMap(e.target);
      // addWMSLayers(map)
      // addTMSLayers(map)
      addJSONLayers(map)
      LayersControls(map)
    });

    return () => {
      map.remove();
    };
  }, []);

  // const toggleLayer = () => {
  //   var stateLayer = Map.getLayoutProperty("flood2017", "visibility");
  //   Map.setLayoutProperty(
  //     "flood2017",
  //     "visibility",
  //     stateLayer === "visible" ? "none" : "visible"
  //   );
  // };

  return (
    <div>
      <nav id="menu"></nav>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default App;
