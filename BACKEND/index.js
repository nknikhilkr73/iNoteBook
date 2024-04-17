
const express = require('express')
const connectToMongo = require("./db")
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

connectToMongo();

const app = express()
const port = 5000

app.use(cors())

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
