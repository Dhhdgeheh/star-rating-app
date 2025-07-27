const express = require('express');
const router = express.Router();
const { getDashboardCounts, getUsers, getStores } = require('../controllers/adminController');
const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

// Protect all routes for admin
router.use(verifyToken, allowRoles('admin'));

router.get('/dashboard-counts', getDashboardCounts);
router.get('/users', getUsers);
router.get('/stores', getStores);

module.exports = router;
