const express = require('express');
const router = express.Router();
const { rateStore, getUserRating } = require('../controllers/ratingController');
const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

// Normal user submits or updates rating
router.post('/', verifyToken, allowRoles('normal'), rateStore);

// Get a user's rating for a specific store
router.get('/:storeId', verifyToken, allowRoles('normal'), getUserRating);

module.exports = router;

