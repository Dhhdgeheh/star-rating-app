const { getCounts, getAllUsers, getAllStores } = require('../models/adminModel');

const getDashboardCounts = async (req, res) => {
  const counts = await getCounts();
  res.json(counts);
};

const getUsers = async (req, res) => {
  const filters = req.query;
  const users = await getAllUsers(filters);
  res.json(users);
};

const getStores = async (req, res) => {
  const filters = req.query;
  const stores = await getAllStores(filters);
  res.json(stores);
};

module.exports = {
  getDashboardCounts,
  getUsers,
  getStores,
};
