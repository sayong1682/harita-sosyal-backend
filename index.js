<<<<<<< HEAD
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser (POST/PUT için gerekli)
app.use(express.json());

// Ana route
app.get("/", (req, res) => {
  res.send("Enment Backend Çalışıyor!");
});

// Route dosyalarını import et
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const messageRoutes = require("./routes/messages");

// Route'ları kullan
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);

// Server başlat
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser (POST/PUT için gerekli)
app.use(express.json());

// Ana route
app.get("/", (req, res) => {
  res.send("Enment Backend Çalışıyor!");
});

// Route dosyalarını import et
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const messageRoutes = require("./routes/messages");

// Route'ları kullan
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);

// Server başlat
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> b9be6255f03acae7f08acb321b24a46b3a0639a8
