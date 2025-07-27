const { submitRating, getUserRatingForStore } = require('../models/ratingModel');

const rateStore = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({ error: 'storeId and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const savedRating = await submitRating(userId, storeId, rating);
    res.status(201).json({ message: 'Rating submitted', rating: savedRating });

  } catch (err) {
    console.error('Rating error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserRating = async (req, res) => {
  try {
    const userId = req.user.userId;
    const storeId = req.params.storeId;

    const rating = await getUserRatingForStore(userId, storeId);
    res.json(rating || { rating: null });
  } catch (err) {
    console.error('Get rating error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  rateStore,
  getUserRating,
};
