import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Room"
  },
  user: {
    type: String,
    required: true
  },
  chat: String,
  gif: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("Chat", chatSchema);
