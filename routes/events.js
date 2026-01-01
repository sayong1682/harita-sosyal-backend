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
  const newEvent = {
    id: events.length + 1,
    title: req.body.title,
    location: req.body.location,
    date: req.body.date
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// ✅ Event güncelle (/events/:id)
router.put("/:id", (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).send("Event bulunamadı");

  event.title = req.body.title || event.title;
  event.location = req.body.location || event.location;
  event.date = req.body.date || event.date;

  res.json(event);
});

// ✅ Event sil (/events/:id)
router.delete("/:id", (req, res) => {
  const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
  if (eventIndex === -1) return res.status(404).send("Event bulunamadı");

  const deleted = events.splice(eventIndex, 1);
  res.json(deleted);
});

module.exports = router;
