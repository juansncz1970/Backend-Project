const pool = require('../config/database');

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT course_id, course_name, course_code, user_id, dept_id, created_at, updated_at FROM courses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT course_id, course_name, course_code, user_id, dept_id, created_at, updated_at FROM courses WHERE course_id = ?', [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: 'Course not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  const { course_name, course_code, user_id, dept_id } = req.body;

  // Check if all required fields are provided
  if (!course_name || !course_code || !user_id || !dept_id) {
    return res.status(400).json({ error: 'All fields (course_name, course_code, user_id, dept_id) are required.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO courses (course_name, course_code, user_id, dept_id) VALUES (?, ?, ?, ?)',
      [course_name, course_code, user_id, dept_id]
    );

    res.status(201).json({ course_id: result.insertId, course_name, course_code, user_id, dept_id });
  } catch (err) {
    // Handle specific MySQL errors
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid user_id or dept_id provided.' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course_name, course_code, user_id, dept_id } = req.body;

  // Check if at least one field is provided for update
  if (!course_name && !course_code && !user_id && !dept_id) {
    return res.status(400).json({ error: 'At least one field (course_name, course_code, user_id, dept_id) is required for update.' });
  }

  try {
    const updates = [];
    const values = [];

    if (course_name) {
      updates.push('course_name = ?');
      values.push(course_name);
    }
    if (course_code) {
      updates.push('course_code = ?');
      values.push(course_code);
    }
    if (user_id) {
      updates.push('user_id = ?');
      values.push(user_id);
    }
    if (dept_id) {
      updates.push('dept_id = ?');
      values.push(dept_id);
    }

    // Adding course_id to the values for the WHERE clause
    values.push(id);

    const [result] = await pool.query(`UPDATE courses SET ${updates.join(', ')} WHERE course_id = ?`, values);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Course not found' });

    res.json({ message: 'Course updated successfully' });
  } catch (err) {
    // Handle specific MySQL errors
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid user_id or dept_id provided.' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Course not found' });

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
