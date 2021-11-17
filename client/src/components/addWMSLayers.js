import { features, workspace } from "./features";

// http://10.199.67.11:8080/geoserver/sc333302/wms?
// SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&
// LAYERS=sc333302%3AKK_TAMBON&    /---------/ชื่อdatabase : ชื่อlayer
// SRS=EPSG%3A900913&             /---------/900913 = 3857
// STYLES=&WIDTH=256&HEIGHT=256& /---------/ขนาด256*256 ก็พอ
// BBOX={bbox-epsg-3857}        /---------/mapbox ใช้ {bbox-epsg-3857}

export default (map) => {

    features.forEach((layer) => {
    map.addLayer({
        id: layer,
        type: "raster",
        source: {
          type: "raster",
          tiles: [
            `http://localhost:8080/geoserver/${workspace}/wms?service=WMS&version=1.1.0&request=GetMap&layers=${workspace}%3A${layer}&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG%3A900913&styles=&format=image%2Fpng&transparent=true`,
          ],
          tileSize: 256,
        },
        paint: {
          "raster-opacity": 0.3,
        },
      })
  });
};