const express = require('express');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllCourses);
router.get('/:id', authenticateToken, getCourseById);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);

module.exports = router;
