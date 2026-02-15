// src/app.js

const express = require("express");
const cors = require("cors");

const incidentsRoutes = require("./routes/incidents.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Incident Tracker API is running");
});

app.use("/api/incidents", incidentsRoutes);

module.exports = app;
