const express = require('express');
const { addVehicle, assginDriver, getVehicle} = require('../controllers/vehicleController');
const { checkRole } = require('../middlewares/auth');
const rateLimiterMiddleware = require('../middlewares/rateLimiter');
const router = express.Router();

router.post('/add', rateLimiterMiddleware, checkRole(['owner']), addVehicle);
router.patch('/assign-driver/:vehicleId', checkRole(['owner']), assginDriver);
router.get('/:vehicleId', checkRole(['owner']), getVehicle);

module.exports = {router};
