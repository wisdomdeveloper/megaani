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

     // Add a review
     router.post(
       '/',
       [
         auth,
         check('courseId').isInt().withMessage('Course ID must be an integer'),
         check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
       ],
       async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }

         const { courseId, rating, comment } = req.body;

         try {
           const courseExists = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
           if (courseExists.rows.length === 0) {
             return res.status(404).json({ message: 'Course not found' });
           }

           const enrolled = await pool.query(
             'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
             [req.user.id, courseId]
           );
           if (enrolled.rows.length === 0) {
             return res.status(403).json({ message: 'Must be enrolled to review' });
           }

           const result = await pool.query(
             'INSERT INTO reviews (user_id, course_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
             [req.user.id, courseId, rating, comment]
           );
           res.status(201).json(result.rows[0]);
         } catch (err) {
           console.error(err);
           res.status(500).json({ message: 'Server error' });
         }
       }
     );

     // Get reviews for a course
     router.get('/course/:courseId', async (req, res) => {
       const { courseId } = req.params;
       try {
         const result = await pool.query(
           'SELECT r.*, u.name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.course_id = $1',
           [courseId]
         );
         res.json(result.rows);
       } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Server error' });
       }
     });

     module.exports = router;