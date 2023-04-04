import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertStudent = payload => api.post(`/students/create-student`, payload)
export const getAllStudents = () => api.get(`/students`)
export const updateStudentById = (id, payload) => api.put(`/students/update-student/${id}`, payload)
export const deleteStudentById = id => api.delete(`/students/delete-student/${id}`)
export const getStudentById = id => api.get(`/students/student/${id}`)

const apis = {
    insertStudent,
    getAllStudents,
    updateStudentById,
    deleteStudentById,
    getStudentById,
}

export default apis