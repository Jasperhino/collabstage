import { createServer } from "http";
import "reflect-metadata";
import app from "./app";
var debug = require("debug")("socketio-server:server");
import socketServer from "./socket";

let port = normalizePort(process.env.PORT || "9009");
let host = "192.168.0.100";

app.set("port", port);

let server = createServer(app);

const io = socketServer(server);

server.listen(port, host);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);

  console.log("Server Running on Port: ", port);
  console.log("Server Adress: ", addr);
}
