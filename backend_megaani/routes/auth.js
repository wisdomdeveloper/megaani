const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Register user
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('name').notEmpty().withMessage('Name is required'),
    check('role').isIn(['student', 'instructor']).withMessage('Role must be student or instructor'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role } = req.body;

    try {
      console.log('Checking if user exists:', email);
      const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      console.log('User check result:', userExists.rows);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('Inserting user into database...');
      const result = await pool.query(
        'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, hashedPassword, name, role || 'student']
      );

      console.log('User inserted:', result.rows[0]);
      const user = result.rows[0];

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({ token, user });
    } catch (err) {
      console.error('❌ Registration error:', err);
      res.status(500).json({
        message: 'Server error',
        details: err?.message || 'Unknown error',
      });
    }
  }
);

// Login user
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, user });
    } catch (err) {
      console.error('❌ Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
