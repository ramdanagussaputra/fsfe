const express = require("express");
const server = require("http").createServer();

const PORT = 3000;
const app = express();

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
