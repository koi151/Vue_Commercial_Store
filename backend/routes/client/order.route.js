const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/order.controller');

router.post("/create-order", controller.orderPost);

module.exports = router;