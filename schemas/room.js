import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  max: {
    type: Number,
    required: true,
    default: 10,
    min: 2
  },
  owner: {
    type: String,
    required: true
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("Room", roomSchema);
