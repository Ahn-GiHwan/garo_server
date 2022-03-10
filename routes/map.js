const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const data = require("../data/trash");
require("dotenv").config();

const URL = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";

router.route("/boroughs").get((req, res) => {
  const boroughs = data.map(({ borough }) => borough);
  const set = new Set([...boroughs]);
  const setSort = [...set].sort();
  const result = setSort.map((borough, i) => ({
    id: i,
    borough,
  }));
  res.json(result);
});

router.route("/geocode/:borough").get((req, res) => {
  const { borough } = req.params;
  axios({
    method: "GET",
    url: `${URL}?query=${encodeURI(borough)}`,
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.clientID,
      "X-NCP-APIGW-API-KEY": process.env.clientSecret,
    },
  }).then(({ data: { addresses } }) => res.json({ latitude: Number(addresses[0].y), longitude: Number(addresses[0].x) }));
});

module.exports = router;
