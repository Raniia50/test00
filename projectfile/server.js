const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());

const dbConfig = {
  host: "database-1.cluster-c9kc105wgnmd.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "12345678",
  database: "mydb",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("error occurred while connecting to the database:", err);
    return;
  }
  console.log('connecting"mydb"');

  const sqlQuery = "SELECT * from balanceSheet , income ";

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("error", error);
    } else {
      console.log("done");

      const jsonData = JSON.stringify(results);

      app.get("/data", (req, res) => {
        res.json(jsonData);
      });
    }

    connection.end();
  });
});

app.listen(3000, () => {
  console.log("connecting port 3000");
});
