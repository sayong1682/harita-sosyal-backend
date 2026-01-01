const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Enment backend çalışıyor 🚀');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Sunucu çalışıyor...');
    });
  })
  .catch(err => console.error('MongoDB bağlantı hatası:', err));
