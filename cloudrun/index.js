const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const SHARED_SECRET = process.env.SHARED_SECRET;

// Shared-secret guard to keep the endpoint private
function requireSharedSecret(req, res, next) {
  if (!SHARED_SECRET) {
    console.warn("SHARED_SECRET is not set; rejecting request");
    return res.status(500).json({ error: "Server secret not configured" });
  }

  const token =
    req.headers["x-shared-secret"] ||
    req.headers["authorization"]?.replace("Bearer ", "");

  if (token !== SHARED_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

app.get("/test", requireSharedSecret, (_req, res) => {
  res.type("text").send("apiアクセス成功!");
});

app.get("/", (_req, res) => {
  res.type("text").send("OK");
});

app.listen(PORT, () => {
  console.log(`Cloud Run API listening on port ${PORT}`);
});
