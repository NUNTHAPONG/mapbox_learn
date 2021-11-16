const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const Layers = require("./route")

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

//route
app.use("/flood2020", Layers.flood2020);
app.use("/flood2019", Layers.flood2019);
app.use("/flood2018", Layers.flood2018);
app.use("/flood2017", Layers.flood2017);

app.get("/", async (req, res) => {
  res.send("Hello world");
});

//path
app.listen(5500, () => {
  console.log("server started on port 5500");
  console.log("All Path : ");
  console.log(`
  /flood2020
  /flood2019
  /flood2018
  /flood2017
  `);
  console.log("");
});
