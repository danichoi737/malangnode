import mongoose from "mongoose";

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@127.0.0.1:27017/admin`;

function connect() {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  mongoose.connect(MONGO_URL, {
    dbName: "chat"
  })
  .then(() => {
    console.log("[DB] MongoDB connected");
  })
  .catch((error) => {
    console.log("[DB] MongoDB connection error: ", error);
  });
}

mongoose.connection.on("error", (error) => {
  console.log("[DB] MongoDB error: ", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("[DB] MongoDB disconnected. Retrying...");
  connect();
});

export default connect;
