import mapboxgl from "maplibre-gl";
import mapboxDraw from "mapbox-gl-draw";

export default (map) => {

  map
    .addControl(new mapboxgl.NavigationControl({

    }))
    .addControl(new mapboxgl.ScaleControl({
        
    }))
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
};
