import { features, workspace } from "./features";

export default (map) => {

  const layer_style = {
    "fill-color": "#0080ff",
    "fill-opacity": 0.3,
  };
  
  features.forEach((layer) => {
    map.addLayer({
      id: layer,
      type: "fill",
      source: {
        type: "vector",
        scheme: "tms",
        tiles: [
          `http://localhost:8080/geoserver/gwc/service/tms/1.0.0/${workspace}:${layer}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
        ],
        minZoom: 0,
        maxZoom: 14,
      },
      "source-layer": layer,
      layout: {
        visibility: "none",
      },
      paint: layer_style,
    });
  });
};
