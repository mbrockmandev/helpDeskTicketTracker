const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc   Get User Tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // get current user ID with JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc   Get a specific ticket
// @route  GET /api/tickets/:id
// @access Private
const getTicketById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized.');
  }

  res.status(200).json(ticket);
});

// @desc   Create New Ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please include both a product and description.');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

// @desc   Update a ticket
// @route  POST /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized.');
  }

  try {
    const newTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(newTicket);
  } catch (error) {
    res.status(400);
    throw new Error(
      `Unable to update the item with id: ${req.params.id}. Please check ${req.body} for any errors.`,
    );
  }
});

// @desc   Delete a ticket
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized.');
  }

  await Ticket.findByIdAndDelete(req.params.id);
  // await ticket.remove();

  res.status(200).json({
    success: true,
    message: `Ticket with id ${req.params.id} deleted.`,
  });
});

module.exports = {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};
