const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const auth = require('./routes/auth');
app.use('/api/v1/auth', auth);

module.exports = app;