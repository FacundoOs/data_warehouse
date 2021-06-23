const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet")
const firstAdmin = require("./controllers/create_first_admin");
require("dotenv").config();

const routes = require('./routes/router.js'); // import the routes


//Middlewares
app.use(cors());

app.use(helmet())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use('/', routes);

//Database

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
  firstAdmin();
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

//Server
app.listen(process.env.PORT, () => {
  console.log(`App listening on PORT: ${process.env.PORT}`);
});
