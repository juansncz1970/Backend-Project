const pool = require('../config/database');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT student_id, fname, lname, mname, user_id, course_id, created_at, updated_at FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT student_id, fname, lname, mname, user_id, course_id, created_at, updated_at FROM students WHERE student_id = ?', [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: 'Student not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  const { fname, lname, mname, user_id, course_id } = req.body; // Capture all necessary fields

  try {
    const [result] = await pool.query('INSERT INTO students (fname, lname, mname, user_id, course_id) VALUES (?, ?, ?, ?, ?)', [fname, lname, mname, user_id, course_id]);
    res.status(201).json({ student_id: result.insertId, fname, lname, mname, user_id, course_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, mname, user_id, course_id } = req.body; // Capture all fields to be updated

  try {
    const [result] = await pool.query('UPDATE students SET fname = ?, lname = ?, mname = ?, user_id = ?, course_id = ? WHERE student_id = ?', [fname, lname, mname, user_id, course_id, id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Student not found' });

    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Student not found' });

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
