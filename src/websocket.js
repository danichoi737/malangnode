import { Server } from "socket.io";

export default function(webserver) {
  const wsServer = new Server(webserver);

  wsServer.on("connection", (socket) => {
    console.log("[WS] Client connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("[WS] Client disconnected: ", socket.id);
    });

    socket.on("error", (error) => {
      console.log("[WS] Socket error: ", error);
    });

    socket.on("offer", (data) => {
      console.log("offer");
      socket.broadcast.emit("offer", data);
    });

    socket.on("answer", (data) => {
      console.log("answer received");
      socket.broadcast.emit("answer", data);
    });

    socket.on("ice", (data) => {
      console.log("ice");
      socket.broadcast.emit("ice", data);
    });
  });
}
