const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const signup = async (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (!name || !email || !password || !address || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'Email already registered' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, address, hashedPassword, role);

  res.status(201).json({ message: 'User created successfully', user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid email or password' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token,
    token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
   });
   
};


module.exports = {
  signup,
  login,
};
