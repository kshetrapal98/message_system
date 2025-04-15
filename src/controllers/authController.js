 


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');

// SIGNUP
exports.signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
     
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or Username already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Return user data without password
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ user: userData,message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return token and user data without password
    const { password: _, ...userData } = user.toObject();
    res.json({user: userData, message: 'Login successful',token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
