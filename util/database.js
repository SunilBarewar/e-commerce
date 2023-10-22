const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "empdb",
//   password: "Sunil2328@",
// });
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "ecom",
  password: "Sunil2328@",
});
module.exports = pool.promise();
