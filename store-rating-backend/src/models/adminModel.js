const pool = require('../config/db');

const getCounts = async () => {
  const users = await pool.query('SELECT COUNT(*) FROM users');
  const stores = await pool.query('SELECT COUNT(*) FROM stores');
  const ratings = await pool.query('SELECT COUNT(*) FROM ratings');

  return {
    total_users: users.rows[0].count,
    total_stores: stores.rows[0].count,
    total_ratings: ratings.rows[0].count,
  };
};

const getAllUsers = async (filters = {}) => {
  const { name = '', email = '', address = '', role = '' } = filters;

  const result = await pool.query(
    `SELECT id, name, email, address, role FROM users
     WHERE name ILIKE $1 AND email ILIKE $2 AND address ILIKE $3 AND role ILIKE $4`,
    [`%${name}%`, `%${email}%`, `%${address}%`, `%${role}%`]
  );

  return result.rows;
};

const getAllStores = async (filters = {}) => {
  const { name = '', email = '', address = '' } = filters;

  const result = await pool.query(
    `SELECT s.*, COALESCE(AVG(r.rating), 0) AS average_rating
     FROM stores s
     LEFT JOIN ratings r ON r.store_id = s.id
     WHERE s.name ILIKE $1 AND s.email ILIKE $2 AND s.address ILIKE $3
     GROUP BY s.id`,
    [`%${name}%`, `%${email}%`, `%${address}%`]
  );

  return result.rows;
};

module.exports = {
  getCounts,
  getAllUsers,
  getAllStores,
};
