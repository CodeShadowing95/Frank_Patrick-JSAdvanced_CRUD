
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        first_name: { type: String, required: true },
        name: { type: String, required: true },
        grade: { type: String, required: true },
        sex: { type: String, required: false },
        date_of_birth: { type: Date, required: false },
        address: { type: String, required: false },
        postal_code: { type: String, required: false },
        town: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('student', Student)