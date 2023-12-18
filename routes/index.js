import express from "express";
const router = express.Router();

router.get("/", (_, res) => {
  res.render("index");
});

router.get("/webrtc", (req, res) => {
  res.render("webrtc");
});

export default router;
