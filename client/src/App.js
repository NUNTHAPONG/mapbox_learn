import React, { useState, useEffect } from "react";
import mapboxgl from "maplibre-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxDraw from "mapbox-gl-draw";
import "mapbox-gl-draw/dist/mapbox-gl-draw.css";

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
      maxzoom: 14,
    });

    map
      .addControl(new mapboxgl.NavigationControl())
      .addControl(new mapboxgl.ScaleControl())
      .addControl(
        new mapboxgl.AttributionControl({
          compact: true,
          customAttribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
        })
      )
      .addControl(
        new mapboxgl.GeolocateControl({
          showAccuracyCircle: false,
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      )
      .addControl(
        new mapboxDraw({
          displayControlsDefault: false,
          controls: {
            point: true,
            line_string: true,
            polygon: true,
            trash: true,
          },
        })
      );

    map.on(`load`, (e) => {
      setMap(e.target);

      map
        //Map WMS Raster by -Geoserver- Request
        // .addLayer({
        //   id: "flood2020",
        //   type: "raster",
        //   source: {
        //     type: "raster",
        //     tiles: [
        //       // "http://localhost:8080/geoserver/gwc/demo/mymap:flood_y2017?gridSet=EPSG:900913&format=image/png",
        //       "http://localhost:8080/geoserver/mymap/wms?service=WMS&version=1.1.0&request=GetMap&layers=mymap%3Aflood_y2017&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG%3A900913&styles=&format=image%2Fpng&transparent=true",

        //       // http://10.199.67.11:8080/geoserver/sc333302/wms?
        //       // SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&
        //       // LAYERS=sc333302%3AKK_TAMBON&    /---------/ชื่อdatabase : ชื่อlayer
        //       // SRS=EPSG%3A900913&             /---------/900913 = 3857
        //       // STYLES=&WIDTH=256&HEIGHT=256& /---------/ขนาด256*256 ก็พอ
        //       // BBOX={bbox-epsg-3857}        /---------/mapbox ใช้ {bbox-epsg-3857}
        //     ],
        //     tileSize: 256,
        //   },
        //   paint: {
        //     "raster-opacity": 0.3,
        //   },
        // })
        // .addLayer({
        //   id: "flood2017",
        //   type: "raster",
        //   source: {
        //     type: "raster",
        //     tiles: [
        //       "http://localhost:8080/geoserver/mymap/wms?service=WMS&version=1.1.0&request=GetMap&layers=mymap%3Aflood_y2017&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG%3A900913&styles=&format=image%2Fpng&transparent=true",
        //     ],
        //     tileSize: 256,
        //   },
        //   paint: {
        //     "raster-opacity": 0.3,
        //   },
        // })
        // .addLayer({
        //   id: "flood2018",
        //   type: "raster",
        //   source: {
        //     type: "raster",
        //     tiles: [
        //       "http://localhost:8080/geoserver/mymap/wms?service=WMS&version=1.1.0&request=GetMap&layers=mymap%3Aflood_y2018&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG%3A900913&styles=&format=image%2Fpng&transparent=true",
        //     ],
        //     tileSize: 256,
        //   },
        //   paint: {
        //     "raster-opacity": 0.3,
        //   },
        // })
        // .addLayer({
        //   id: "flood2019",
        //   type: "raster",
        //   source: {
        //     type: "raster",
        //     tiles: [
        //       "http://localhost:8080/geoserver/mymap/wms?service=WMS&version=1.1.0&request=GetMap&layers=mymap%3Aflood_y2019&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG%3A900913&styles=&format=image%2Fpng&transparent=true",
        //     ],
        //     tileSize: 256,
        //   },
        //   paint: {
        //     "raster-opacity": 0.3,
        //   },
        // })

        //Map WMTS Vector by -Geoserver- Request
        .addLayer({
          id: "flood2017",
          type: "fill",
          source: {
            type: "vector",
            scheme: "tms",
            tiles: [
              "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/mymap:flood_y2017@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
            ],
            minZoom: 0,
            maxZoom: 14,
          },
          "source-layer": "flood_y2017",
          layout: {
            visibility: vibs,
          },
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.3,
          },
        })
        .addLayer({
          id: "flood2018",
          type: "fill",
          source: {
            type: "vector",
            scheme: "tms",
            tiles: [
              "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/mymap:flood_y2018@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
            ],
            minZoom: 0,
            maxZoom: 14,
          },
          "source-layer": "flood_y2018",
          layout: {
            visibility: vibs,
          },
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.3,
          },
        })
        .addLayer({
          id: "flood2019",
          type: "fill",
          source: {
            type: "vector",
            scheme: "tms",
            tiles: [
              "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/mymap:flood_y2019@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
            ],
            minZoom: 0,
            maxZoom: 14,
          },
          "source-layer": "flood_y2019",
          layout: {
            visibility: vibs,
          },
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.3,
          },
        })
        .addLayer({
          id: "flood2020",
          type: "fill",
          source: {
            type: "vector",
            scheme: "tms",
            tiles: [
              "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/mymap:flood_y2020@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
            ],
            minZoom: 0,
            maxZoom: 14,
          },
          "source-layer": "flood_y2020",
          layout: {
            visibility: vibs,
          },
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.3,
          },
        });

      //Map WFS GeoJSON by -NodeJS- Database PostGIS SQLRequest
      // .addLayer({
      //   id: "flood2017",
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: "http://localhost:5500/flood2017",
      //   },
      //   layout: {
      //     visibility: vibs,
      //   },
      //   paint: {
      //     "fill-color": "#0080ff",
      //     "fill-opacity": 0.3,
      //   },
      // })
      // .addLayer({
      //   id: "flood2018",
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: "http://localhost:5500/flood2018",
      //   },
      //   layout: {
      //     visibility: vibs,
      //   },
      //   paint: {
      //     "fill-color": "#0080ff",
      //     "fill-opacity": 0.3,
      //   },
      // })
      // .addLayer({
      //   id: "flood2019",
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: "http://localhost:5500/flood2019",
      //   },
      //   layout: {
      //     visibility: vibs,
      //   },
      //   paint: {
      //     "fill-color": "#0080ff",
      //     "fill-opacity": 0.3,
      //   },
      // })
      // .addLayer({
      //   id: "flood2020",
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: "http://localhost:5500/flood2020",
      //   },
      //   layout: {
      //     visibility: vibs,
      //   },
      //   paint: {
      //     "fill-color": "#0080ff",
      //     "fill-opacity": 0.3,
      //   },
      // });
    });

    map.on("load", () => {
      // Enumerate ids of the layers.
      const toggleableLayerIds = ["flood2017", "flood2018", "flood2019", "flood2020"];

      // Set up the corresponding toggle button for each layer.
      for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
          continue;
        }

        // Create a link.
        const link = document.createElement("a");
        link.id = id;
        link.href = "#";
        link.textContent = id;
        // link.className = "active";

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
          const clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.getLayoutProperty(clickedLayer, "visibility");

          // Toggle layer visibility by changing the layout object's visibility property.
          if (visibility === "visible") {
            map.setLayoutProperty(clickedLayer, "visibility", "none");
            this.className = "";
          } else {
            this.className = "active";
            map.setLayoutProperty(clickedLayer, "visibility", "visible");
          }
        };

        const layers = document.getElementById("menu");
        layers.appendChild(link);
      }
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
