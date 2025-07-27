const pool = require('../config/db');

const getStoreRatingsByOwner = async (ownerId) => {
  const result = await pool.query(`
    SELECT s.name AS store_name, u.name AS user_name, u.email, r.rating
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    JOIN users u ON r.user_id = u.id
    WHERE s.owner_id = $1
  `, [ownerId]);

  return result.rows;
};

const getStoreAverageRatingByOwner = async (ownerId) => {
  const result = await pool.query(`
    SELECT s.name AS store_name, AVG(r.rating)::numeric(2,1) AS average_rating
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = $1
    GROUP BY s.name
  `, [ownerId]);

  return result.rows;
};

module.exports = {
  getStoreRatingsByOwner,
  getStoreAverageRatingByOwner,
};
