const app = require("./app");
const http = require("http");
const express = require("express");
const path = require("path");
const socket = require("socket.io");

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

const io = socket(server);

io.on("connect", socket => {
  console.log("Connected to Socket" + socket.id);
});

server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.on("listening", () => {
  console.log(
    `server is listening for requests on port ${server.address().port}`
  );
});
