const express = require('express');
const router = express.Router();
const {
  viewRatings,
  viewAverageRating
} = require('../controllers/storeOwnerController');

const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

router.get('/ratings', verifyToken, allowRoles('store_owner'), viewRatings);
router.get('/average', verifyToken, allowRoles('store_owner'), viewAverageRating);

module.exports = router;
