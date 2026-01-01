const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Ana route
app.get("/", (req, res) => {
  res.send("Enment Backend Çalışıyor!");
});

// Route'ları kullan
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);

// Server başlat
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
