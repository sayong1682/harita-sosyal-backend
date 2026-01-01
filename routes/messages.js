const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Mesaj gönder
router.post('/send', async (req, res) => {
  const { token, to, content } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const message = new Message({
      from: decoded.userId,
      to,
      content
    });
    await message.save();
    res.status(201).json({ message: 'Mesaj gönderildi' });
  } catch (err) {
    res.status(400).json({ error: 'Mesaj gönderilemedi', details: err.message });
  }
});

// Kullanıcının mesajlarını listele
router.get('/inbox/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ to: req.params.userId }).populate('from', 'username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Mesajlar alınamadı', details: err.message });
  }
});

// Admin tüm mesajları görebilir
router.get('/all', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Yetkisiz' });

    const messages = await Message.find().populate('from to', 'username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Admin mesajları göremedi', details: err.message });
  }
});

module.exports = router;
