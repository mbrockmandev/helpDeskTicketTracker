const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectRoute } = require('../middleware/authMiddleware');
const { getNotes, createNote } = require('../controllers/noteController');

router.route('/').get(protectRoute, getNotes).post(protectRoute, createNote);

module.exports = router;
