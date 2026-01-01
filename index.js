const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Ana route (test için)
app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

// Route dosyalarını import et
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const messageRoutes = require("./routes/messages");

// Route'ları kullan
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
