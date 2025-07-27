const express = require('express');
const router = express.Router();
const { addStore, listStores } = require('../controllers/storeController');
const { verifyToken, allowRoles } = require('../middlewares/authMiddleware');

// Admin-only: add store
router.post('/', verifyToken, allowRoles('admin'), addStore);

// Public: get all stores
router.get('/', verifyToken, listStores);

module.exports = router;

