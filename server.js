if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const ejsMate = require("ejs-mate");


const userRoutes = require('./routes/users')


const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


const PORT = process.env.PORT || 3000;
const DB_URL = process.env.db_URL || 'mongodb://localhost:27017';


mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  });


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "views"));


const secret = process.env.SECRET || "examplesecretkey";
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
  })
);


app.use('/', userRoutes);

app.all('*', (req, res) => {
  res.redirect('/products');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
