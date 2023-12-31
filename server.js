import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import "dotenv/config.js";
import express from "express";
// Routers
import authRouter from "./routes/auth.js";
import pageRouter from "./routes/index.js";
// Modules
import websocket from "./src/websocket.js";

// Express
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(authRouter);
app.use(pageRouter);

// HTTPS
const keyPath = path.join(path.resolve(), process.env.KEY_PATH);
const certPath = path.join(path.resolve(), process.env.CERT_PATH);
const httpsCerts = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};
const httpsServer = https.createServer(httpsCerts, app);
const httpsPort = process.env.HTTPS_PORT || 8443;

httpsServer.listen(httpsPort, () => {
  console.log("[HTTPS] Server listening: ", httpsServer.address().port);
});

websocket(httpsServer);
