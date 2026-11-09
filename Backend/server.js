
require('dotenv').config();

const dns = require('node:dns').promises;
const dnsNative = require('node:dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const professionalRoutes = require('./routes/professionalRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// DNS configuration
dnsNative.setServers(['8.8.8.8', '1.1.1.1']);

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB DNS diagnostic
dns.resolveSrv('_mongodb._tcp.cluster0.dtctqqd.mongodb.net')
  .then((records) => {
    console.log('MongoDB DNS records:', records);
  })
  .catch((err) => {
    console.error('MongoDB DNS diagnostic:', err.code, err.message);
  });

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
