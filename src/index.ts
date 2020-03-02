import "reflect-metadata";
import { createConnection } from "typeorm";
import { useExpressServer } from "routing-controllers";

let express = require("express"); // or you can import it if you have installed typings
let app = express(); // your created express server
// app.use() // you can configure it the way you want

const port = 5000;

const bodyParser = require("body-parser");

createConnection()
  .then(async connection => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    useExpressServer(app, {
      routePrefix: "/api",
      controllers: [__dirname + "/controllers/*.ts"]
    });
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(error => console.log(error));
