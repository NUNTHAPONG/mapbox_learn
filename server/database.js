const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "1234",
  database: "mymap",
  host: "localhost",
  port: 5432,
});
pool
  .connect()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Connection Error", err.stack));
  
module.exports = pool