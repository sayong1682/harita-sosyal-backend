const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Kullanıcı kaydı
router.post('/signup', async (req, res) => {
  const { username, password, isPrivate } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, isPrivate });
    await user.save();
    res.status(201).json({ message: 'Kayıt başarılı' });
  } catch (err) {
    res.status(400).json({ error: 'Kayıt başarısız', details: err.message });
  }
});

// Giriş
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Şifre yanlış' });

<<<<<<< HEAD
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
=======
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
>>>>>>> b9be6255f03acae7f08acb321b24a46b3a0639a8
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Giriş hatası', details: err.message });
  }
});

// Takip et
router.post('/follow/:id', async (req, res) => {
  const followerId = req.body.followerId;
  const targetId = req.params.id;
  try {
    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ error: 'Hedef kullanıcı yok' });

    if (!target.followers.includes(followerId)) {
      target.followers.push(followerId);
      await target.save();
    }

<<<<<<< HEAD
    res.status(200).json({ message: 'Takip başarılı' });
  } catch (err) {
    res.status(500).json({ error: 'Takip hatası', details: err.message });
  }
});

module.exports = router;
=======
    res
>>>>>>> b9be6255f03acae7f08acb321b24a46b3a0639a8
