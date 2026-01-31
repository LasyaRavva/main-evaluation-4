require('dotenv').config();
const express = require('express');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const tripRoutes = require('./routes/tripRoutes');
const analyticsRoutes = requires('./routes/analyticsRoutes.js');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/users', userRoutes);
