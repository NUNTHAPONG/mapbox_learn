const express = require("express");
const router = express.Router();

const db = require("../database")

router.get('/', async(req, res) => {
        await db.query(
        `SELECT *,ST_AsGeoJSON(geom) AS geojson FROM flood_y2020;`,
        (err, result) => {
          let collection = {
            type: "FeatureCollection",
            features: [],
          };
          for (let i of result.rows) {
            let feature = {
              type: "Feature",
              geometry: JSON.parse(i.geojson),
              properties: {},
            };
            delete i.geojson
            delete i.geom
            feature.properties = i
            collection.features.push(feature);
          }
          res.send(collection)
        }
      )

})

module.exports = router ;