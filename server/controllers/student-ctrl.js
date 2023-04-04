
const Student = require('../models/student-model')

createStudent = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a student',
        })
    }
    const student = new Student(body)
    
    if (!student) {
        return res.status(400).json({ success: false, error: err })
    }
    
    try {
        await student.save()
        return res.status(201).json({
            success: true,
            id: student._id,
            message: 'Student created!',
        })
    } catch (error) {
        return res.status(400).json({
            error,
            message: 'Student not created!',
        })
    }
}

updateStudent = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    try {
        const student = await Student.findOne({ _id: req.params.id })
        if (!student) {
            return res.status(404).json({
                message: 'Student not found!',
            })
        }
        student.first_name = body.first_name
        student.grade = body.grade
        student.sex = body.sex
        student.date_od_birth = body.date_od_birth
        student.address = body.address
        student.postal_code = body.postal_code
        student.town = body.town
    
        await student.save()
        return res.status(200).json({
            success: true,
            id: student._id,
            message: 'Student updated!',
        })
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'Student not updated!',
        })}
}

deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ _id: req.params.id })
        if (!student) {
            return res.status(404).json({ success: false, error: "Student not found" })
        }
        return res.status(200).json({ success: true, data: student })
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
    }

getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id })
        if (!student) {
            return res.status(404).json({ success: false, error: "Student not found" })
        }
        return res.status(200).json({ success: true, data: student })
    } catch (error) {
        return res.status(400).json({ success: false, error })
}
}

getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        if (!students.length) {
            return res.status(404).json({ success: false, error: `Students not found` });
        }
        return res.status(200).json({ success: true, data: students });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
    }
};

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getStudents,
    getStudentById,
}