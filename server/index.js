require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.APP_PORT;
const apiTarget = process.env.API_TARGET;

// development purpose only
app.use(cors());

// api routes
app.use(
  "/api",
  createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true,
  })
);

// app routes
app.use(express.static('../client/dist'));

app.listen(port, () => console.log(`Server running on port ${port}`));
