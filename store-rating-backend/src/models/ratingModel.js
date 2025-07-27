const pool = require('../config/db');

const submitRating = async (userId, storeId, rating) => {
  const result = await pool.query(
    `
    INSERT INTO ratings (user_id, store_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, store_id)
    DO UPDATE SET rating = EXCLUDED.rating
    RETURNING *;
    `,
    [userId, storeId, rating]
  );
  return result.rows[0];
};

const getUserRatingForStore = async (userId, storeId) => {
  const result = await pool.query(
    'SELECT rating FROM ratings WHERE user_id = $1 AND store_id = $2',
    [userId, storeId]
  );
  return result.rows[0];
};

module.exports = {
  submitRating,
  getUserRatingForStore,
};
