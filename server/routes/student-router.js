const express = require('express')

const studentCtrl = require('../controllers/student-ctrl')

const router = express.Router()

router.post('/students/create-student', studentCtrl.createStudent)
router.put('/students/update-student/:id', studentCtrl.updateStudent)
router.delete('/students/delete-student/:id', studentCtrl.deleteStudent)
router.get('/students/student/:id', studentCtrl.getStudentById)
router.get('/students', studentCtrl.getStudents)

module.exports = router