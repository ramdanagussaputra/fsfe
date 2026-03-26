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

// Begin WebSockets
const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const numClients = wss.clients.size;
  console.log(`Client connected: ${numClients}`);
  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send(`welcome! Current visitors: ${numClients}`);
  }

  ws.on("close", () => {
    wss.broadcast(`Current visitors: ${wss.clients.size}`);
    console.log("A client has disconnected");
  });

  ws.on("error", function error() {
    console.log("An error occurred");
  });
});

wss.broadcast = (data) => {
  console.log("Broadcasting: ", data);

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
};
