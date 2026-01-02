const express = require("express");
const router = express.Router();

// Örnek veri (ileride MongoDB'den çekeceksin)
let events = [
  { id: 1, title: "Yeni Yıl Festivali", location: "İstanbul", date: "2026-01-01", favorite: false },
  { id: 2, title: "Müzik Konseri", location: "Ankara", date: "2026-02-15", favorite: false }
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
    date: req.body.date,
    favorite: false
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

// ✅ Event arama (/events/search?title=...&location=...)
router.get("/search", (req, res) => {
  const { title, location } = req.query;
  let filtered = events;

  if (title) filtered = filtered.filter(e => e.title.toLowerCase().includes(title.toLowerCase()));
  if (location) filtered = filtered.filter(e => e.location.toLowerCase().includes(location.toLowerCase()));

  res.json(filtered);
});

// ✅ Tarihe göre filtreleme (/events/filter?start=YYYY-MM-DD&end=YYYY-MM-DD)
router.get("/filter", (req, res) => {
  const { start, end } = req.query;
  let filtered = events;

  if (start) filtered = filtered.filter(e => new Date(e.date) >= new Date(start));
  if (end) filtered = filtered.filter(e => new Date(e.date) <= new Date(end));

  res.json(filtered);
});

// ✅ Sayfalama (/events/page?page=1&limit=10)
router.get("/page", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = events.slice(startIndex, endIndex);
  res.json({
    page,
    limit,
    total: events.length,
    data: result
  });
});

// ✅ Sıralama (/events/sort?by=date&order=asc)
router.get("/sort", (req, res) => {
  const { by = "date", order = "asc" } = req.query;
  let sorted = [...events];

  sorted.sort((a, b) => {
    if (order === "asc") return a[by] > b[by] ? 1 : -1;
    else return a[by] < b[by] ? 1 : -1;
  });

  res.json(sorted);
});

// ✅ Toplam event sayısı (/events/count)
router.get("/count", (req, res) => {
  res.json({ total: events.length });
});

// ✅ Favori ekleme/çıkarma (/events/:id/favorite)
router.post("/:id/favorite", (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).send("Event bulunamadı");

  event.favorite = !event.favorite;
  res.json({ message: `Event favori durumu değiştirildi: ${event.favorite}`, event });
});

// ✅ Favorileri listeleme (/events/favorites)
router.get("/favorites", (req, res) => {
  const favorites = events.filter(e => e.favorite);
  res.json(favorites);
});

module.exports = router;