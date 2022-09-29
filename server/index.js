const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extened: true }));
app.use(express.json());

const http = require("http");
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "https://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`connected: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log(`disconected: A user disconnected!`);
  });
});

import { tasks } from "./data";

app.get("/api", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
