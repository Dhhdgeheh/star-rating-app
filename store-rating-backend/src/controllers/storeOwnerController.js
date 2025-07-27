const {
  getStoreRatingsByOwner,
  getStoreAverageRatingByOwner
} = require('../models/storeOwnerModel');

const viewRatings = async (req, res) => {
  const ownerId = req.user.userId;
  const ratings = await getStoreRatingsByOwner(ownerId);
  res.json(ratings);
};

const viewAverageRating = async (req, res) => {
  const ownerId = req.user.userId;
  const avg = await getStoreAverageRatingByOwner(ownerId);
  res.json(avg);
};

module.exports = {
  viewRatings,
  viewAverageRating,
};
