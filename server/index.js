const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const studentRouter = require('./routes/student-router')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Student app for ReactJs Project API !!!')
})


app.use('/api', studentRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))