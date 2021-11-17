import { features } from "./features";

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
          type: "geojson",
          data: `http://localhost:5500/${layer}`,
        },
        layout: {
          visibility: "none",
        },
        paint: layer_style,
      })
  });
};