const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Etkinlik oluştur
router.post('/create', async (req, res) => {
  const { token, country, description, isPublic, password, location } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const event = new Event({
      creator: decoded.userId,
      country,
      description,
      isPublic,
      password,
      location
    });
    await event.save();
    res.status(201).json({ message: 'Etkinlik oluşturuldu' });
  } catch (err) {
    res.status(400).json({ error: 'Etkinlik oluşturulamadı', details: err.message });
  }
});

// Etkinlikleri listele
router.get('/list/:userId', async (req, res) => {
  const viewerId = req.params.userId;
  try {
    const viewer = await User.findById(viewerId);
    const allEvents = await Event.find().populate('creator');

    const visibleEvents = allEvents.filter(event => {
      const creator = event.creator;
      const isFollower = creator.followers.includes(viewerId);
      const isOwner = creator._id.toString() === viewerId;
      const isAdmin = viewer.role === 'admin';

      if (event.isPublic || isOwner || isFollower || isAdmin) {
        return true;
      }
      return false;
    });

    res.json(visibleEvents);
  } catch (err) {
    res.status(500).json({ error: 'Etkinlik listelenemedi', details: err.message });
  }
});

// Şifreli etkinlik erişimi
router.post('/access/:id', async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const event = await Event.findById(req.params.id).populate('creator');
    const viewer = await User.findById(decoded.userId);

    const isFollower = event.creator.followers.includes(decoded.userId);
    const isOwner = event.creator._id.toString() === decoded.userId;
    const isAdmin = viewer.role === 'admin';

    if (event.isPublic || isOwner || isFollower || isAdmin || event.password === password) {
      res.json(event);
    } else {
      res.status(403).json({ error: 'Erişim reddedildi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erişim hatası', details: err.message });
  }
});

module.exports = router;
