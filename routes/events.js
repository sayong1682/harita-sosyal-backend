const express = require("express");
const router = express.Router();

// Örnek veri (ileride MongoDB'den çekeceksin)
let events = [
  { id: 1, title: "Yeni Yıl Festivali", location: "İstanbul", date: "2026-01-01" },
  { id: 2, title: "Müzik Konseri", location: "Ankara", date: "2026-02-15" }
];

// ✅ Root endpoint (/events)
router.get("/", (req, res) => {
  res.send("Events route çalışıyor 🚀");
});

// ✅ Tüm eventleri listele (/events/all)
router.get("/all", (req, res) => {
  res.json(events);
});

// ✅ Tek event getir (/events/:id)
router.get("/:id", (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).send("Event bulunamadı");
  res.json(event);
});

// ✅ Yeni event ekle (/events)
router.post("/", (req, res) => {
