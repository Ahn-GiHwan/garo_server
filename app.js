const express = require("express");
const cors = require("cors");
const trash = require("./data/trash");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/borough", (req, res) => {
  const boroughs = trash.map(({ borough }) => borough);
  const set = new Set([...boroughs]);
  const setSort = [...set].sort();
  const result = setSort.map((borough, i) => ({
    id: i,
    borough,
  }));
  res.json(result);
});

app.get("/borough/count", (req, res) => {
  const result = [];
  const boroughs = trash.map(({ borough }) => borough);
  const set = new Set([...boroughs]);
  const borough = [...set].sort();
  borough.forEach((bo) => {
    const count = boroughs.filter((item) => item === bo).length;
    result.push({ borough: bo, count });
  });

  res.json(result);
});

app.get("/borough/:name", (req, res) => {
  const { name } = req.params;

  const result = trash.filter((item) => item.borough === name);
  res.json(result);
});

app.get("/boroughInLoadNames", (req, res) => {
  let result = [];
  const boroughs = trash.map(({ borough }) => borough);
  const set = new Set([...boroughs]);
  const setSort = [...set].sort();

  setSort.forEach((borough) => {
    const sameNameByBorough = trash.filter((item) => item.borough === borough);
    const loadNames = sameNameByBorough.map(({ loadName }) => loadName);
    const set = new Set([...loadNames]);
    const a = [...set].sort();

    result.push({ title: borough, data: [...a] });
  });

  res.json(result);
});

app.get("/loadName/:borough", (req, res) => {
  const { borough } = req.params;

  const sameNameByBorough = trash.filter((item) => item.borough === borough);
  const loadNames = sameNameByBorough.map(({ loadName }) => loadName);
  const set = new Set([...loadNames]);

  const result = [...set].sort();
  res.json(result);
});

app.get("/loadName/:borough/count", (req, res) => {
  const { borough } = req.params;

  const result = [];
  const sameNameByBorough = trash.filter((item) => item.borough === borough);
  const loadNames = sameNameByBorough.map(({ loadName }) => loadName);
  const set = new Set([...loadNames]);
  const loadName = [...set].sort();
  loadName.forEach((name) => {
    const count = loadNames.filter((item) => item === name).length;
    result.push({ loadName: name, count });
  });

  res.json(result);
});

app.get("/test", (req, res) => {
  const a = trash.filter((item) => item.borough === "강남구").length;
  console.log(a);
  res.json({ count: a });
});

app.listen(process.env.PORT || 5555, () => {
  console.log("start server ");
});
