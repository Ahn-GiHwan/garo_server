const express = require("express");
const router = express.Router();
const data = require("../data/trash");
const boroughs = data.map(({ borough }) => borough);
const set = new Set([...boroughs]);
const setSort = [...set].sort();

router.route("/boroughs").get((req, res) => {
  const borough = setSort.map((borough, i) => ({
    id: i + 1,
    borough,
  }));

  const result = [{ id: 0, borough: "전체" }, ...borough];

  res.json(result);
});

router.route("/borough/loadNames/count").get((req, res) => {
  const result = [];
  const innerData = [];
  const boroughs = setSort.map((borough) => borough);

  boroughs.forEach((borough) => {
    const filterBorough = data.filter((item) => item.borough === borough);

    const loadNames = filterBorough.map(({ loadName }) => loadName);
    const set = new Set([...loadNames]);
    const sortLoadNames = [...set].sort();

    const innerObj = {};
    sortLoadNames.forEach((label) => {
      let value = 0;
      filterBorough.forEach((item) => {
        if (item.loadName === label) value++;
      });
      innerObj.label = label;
      innerObj.value = value;
    });
    innerData.push(innerObj);

    result.push({ title: borough, data: innerData });
  });

  res.json(result);
});

module.exports = router;
