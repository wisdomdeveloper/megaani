const express = require('express');
   const jwt = require('jsonwebtoken');
   const { check, validationResult } = require('express-validator');
   const { Pool } = require('pg');
   require('dotenv').config();

   const router = express.Router();
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });

   // Middleware to verify JWT
   const auth = (req, res, next) => {
     const token = req.header('Authorization')?.replace('Bearer ', '');
     if (!token) {
       return res.status(401).json({ message: 'No token, authorization denied' });
     }

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
     } catch (err) {
       res.status(401).json({ message: 'Invalid token' });
     }
   };

   // Middleware to check instructor role
   const isInstructor = (req, res, next) => {
     if (req.user.role !== 'instructor') {
       return res.status(403).json({ message: 'Access denied, instructor only' });
     }
     next();
   };

   // Create course
   router.post(
     '/',
     [
       auth,
       isInstructor,
       check('title').notEmpty().withMessage('Title is required'),
       check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
     ],
     async (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

       const { title, description, price } = req.body;

       try {
         const result = await pool.query(
           'INSERT INTO courses (title, description, instructor_id, price) VALUES ($1, $2, $3, $4) RETURNING *',
           [title, description, req.user.id, price]
         );
         res.status(201).json(result.rows[0]);
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Server error' });
       }
     }
   );

   // Get all courses
   router.get('/', async (req, res) => {
     try {
       const result = await pool.query('SELECT * FROM courses');
       res.json(result.rows);
     } catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   // Get course by ID
   router.get('/:id', async (req, res) => {
     const { id } = req.params;
     try {
       const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
       if (result.rows.length === 0) {
         return res.status(404).json({ message: 'Course not found' });
       }
       res.json(result.rows[0]);
     } catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   // Update course
   router.put(
     '/:id',
     [
       auth,
       isInstructor,
       check('title').notEmpty().withMessage('Title is required'),
       check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
     ],
     async (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

       const { id } = req.params;
       const { title, description, price } = req.body;

       try {
         const result = await pool.query(
           'UPDATE courses SET title = $1, description = $2, price = $3 WHERE id = $4 AND instructor_id = $5 RETURNING *',
           [title, description, price, id, req.user.id]
         );
         if (result.rows.length === 0) {
           return res.status(404).json({ message: 'Course not found or not authorized' });
         }
         res.json(result.rows[0]);
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Server error' });
       }
     }
   );

   // Delete course
   router.delete('/:id', [auth, isInstructor], async (req, res) => {
     const { id } = req.params;
     try {
       const result = await pool.query(
         'DELETE FROM courses WHERE id = $1 AND instructor_id = $2 RETURNING *',
         [id, req.user.id]
       );
       if (result.rows.length === 0) {
         return res.status(404).json({ message: 'Course not found or not authorized' });
       }
       res.json({ message: 'Course deleted' });
     } catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Server error' });
     }
   });

   module.exports = router;