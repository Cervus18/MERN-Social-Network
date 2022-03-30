const express = require('express')
const connectDB = require("./config/db")
const app = express()

// Connect DB
connectDB()

// Init middleware (allows us to get json data when posting to a route)
app.use(express.json({limit: '10mb', extended: true}))


// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/conversations', require('./routes/api/conversation'))
app.use('/api/messages', require('./routes/api/message'))



app.get('/',(req,res) => res.send('API running'))
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))

