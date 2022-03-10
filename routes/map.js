const express = require("express");
const router = express.Router();
const data = require("../data/trash");

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

module.exports = router;
