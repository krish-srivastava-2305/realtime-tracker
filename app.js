const express = require("express");
const app = express();

const port = 3000;

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(port);
