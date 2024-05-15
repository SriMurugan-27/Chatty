const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const socket = require("socket.io");
const connectDB = require("./db/connect");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT || 3000;

const connectMongo = async () => {
  await connectDB(process.env.MONGO_URL);
};

connectMongo();

const server = app.listen(port, () => {
  console.log(`Server is Up and Running in port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
