import dotenv from "dotenv";
import express from "express";
// Routers
import router from "./routes/index.js";
// Modules
import websocket from "./src/websocket.js";

// dotenv
dotenv.config();

// Express
const HTTP_PORT = "HTTP_PORT";
const app = express();
app.set(HTTP_PORT, process.env.HTTP_PORT || 8000);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(router);

const httpServer = app.listen(app.get(HTTP_PORT), () => {
  console.log("[HTTP] Server listening: " + app.get(HTTP_PORT));
});

websocket(httpServer);
