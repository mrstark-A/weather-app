const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const cors = require("cors");
const weatherData = require("./utils/weatherData");

const port = process.env.PORT || 3000;

const publicStaticPath = path.join(__dirname, "./public");

const viewsPath = path.join(__dirname, "./templates/views");

const partialsPath = path.join(__dirname, "./templates/partials");
// Security
app.use(cors());

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// all html css js files
app.use(express.static(publicStaticPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

// localhost:3000/weather?address=<anything>
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "you must enter address in search text box",
    });
  }
  weatherData(
    address,
    (error, { temperature, description, cityName, country } = {}) => {
      if (error) {
        return res.send({ error });
      }
      console.log(temperature, description, cityName, country);
      res.send({
        temperature,
        description,
        cityName,
        country,
      });
    }
  );
});

// error page
app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is up and running on port:", port);
});
