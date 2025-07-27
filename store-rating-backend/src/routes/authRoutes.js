const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');


router.post('/register', signup);
router.post('/login', login);
// router.post('/register', authController.signup);
router.get('/test-protected', verifyToken, (req, res) => {
  res.json({ message: `Hello, user ID ${req.user.userId}, Role: ${req.user.role}` });
});


module.exports = router;
