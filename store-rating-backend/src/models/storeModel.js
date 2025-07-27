const pool = require('../config/db');

const createStore = async (name, email, address, ownerId) => {
  const result = await pool.query(
    'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, address, ownerId]
  );
  return result.rows[0];
};

const getAllStores = async () => {
  const result = await pool.query(`
    SELECT s.*, COALESCE(AVG(r.rating), 0) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY s.name ASC
  `);
  return result.rows;
};

module.exports = {
  createStore,
  getAllStores,
};
