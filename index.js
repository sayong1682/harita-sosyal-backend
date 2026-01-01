const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "sayong" && password === "4528192yusuf") {
    res.json({ message: "Giriş başarılı!" });
  } else {
    res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
  }
});

app.listen(3000, () => {
  console.log("Sunucu çalışıyor");
});
