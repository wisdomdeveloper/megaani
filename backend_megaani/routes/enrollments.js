const express = require('express');
     const jwt = require('jsonwebtoken');
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

     // Enroll in a course
     router.post('/', auth, async (req, res) => {
       const { courseId } = req.body;
       try {
         const courseExists = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
         if (courseExists.rows.length === 0) {
           return res.status(404).json({ message: 'Course not found' });
         }

         const alreadyEnrolled = await pool.query(
           'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
           [req.user.id, courseId]
         );
         if (alreadyEnrolled.rows.length > 0) {
           return res.status(400).json({ message: 'Already enrolled' });
         }

         const result = await pool.query(
           'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *',
           [req.user.id, courseId]
         );
         res.status(201).json(result.rows[0]);
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Server error' });
       }
     });

     // Get user's enrollments
     router.get('/user/:userId', auth, async (req, res) => {
       const { userId } = req.params;
       if (req.user.id !== parseInt(userId)) {
         return res.status(403).json({ message: 'Access denied' });
       }

       try {
         const result = await pool.query(
           'SELECT e.*, c.title FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = $1',
           [userId]
         );
         res.json(result.rows);
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Server error' });
       }
     });

     module.exports = router;