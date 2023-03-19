const express = require('express');
const router = express.Router();
const { getTickets, createTicket } = require('../controllers/ticketController');
const { protectRoute } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protectRoute, getTickets)
  .post(protectRoute, createTicket);

module.exports = router;
