const { createStore, getAllStores } = require('../models/storeModel');

const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const store = await createStore(name, email, address, ownerId);
    res.status(201).json({ message: 'Store created', store });
  } catch (err) {
    console.error('Add store error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const listStores = async (req, res) => {
  try {
    const stores = await getAllStores();
    res.json(stores);
  } catch (err) {
    console.error('List stores error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addStore,
  listStores,
};
