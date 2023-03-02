const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/', orderController.order);

module.exports = router;
