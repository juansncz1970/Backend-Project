const express = require('express');
const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllDepartments);
router.get('/:id', authenticateToken, getDepartmentById);
router.post('/', authenticateToken, createDepartment);
router.put('/:id', authenticateToken, updateDepartment);
router.delete('/:id', authenticateToken, deleteDepartment);

module.exports = router;
