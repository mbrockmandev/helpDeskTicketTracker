const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

const { protectRoute } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protectRoute, getTickets)
  .post(protectRoute, createTicket);

router
  .route('/:id')
  .get(protectRoute, getTicketById)
  .put(protectRoute, updateTicket)
  .delete(protectRoute, deleteTicket);

module.exports = router;
