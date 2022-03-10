const express = require("express");
const router = express.Router();
const data = require("../data/trash");

router.route("/boroughs").get((req, res) => {
  const boroughs = data.map(({ borough }) => borough);
  const set = new Set([...boroughs]);
  const setSort = [...set].sort();
  const borough = setSort.map((borough, i) => ({
    id: i + 1,
    borough,
  }));

  const result = [{ id: 0, borough: "전체" }, ...borough];

  res.json(result);
});

module.exports = router;
