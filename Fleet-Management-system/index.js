require('dotenv').config();
const express = require('express');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const tripRoutes = require('./routes/tripRoutes');
const { not } = require('joi');
const analyticsRoutes = requires('./routes/analyticsRoutes.js');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/trips', tripRoutes);
app.use('/analytics', analyticsRoutes);

app.use(notFound)

const PORT = process.env.PORT ||3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));