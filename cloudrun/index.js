const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/test", (_req, res) => {
  res.type("text").send("apiアクセス成功!");
});

app.get("/", (_req, res) => {
  res.type("text").send("OK");
});

app.listen(PORT, () => {
  console.log(`Cloud Run API listening on port ${PORT}`);
});
