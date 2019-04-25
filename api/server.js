if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')
const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;

const config = require('./config')

const server = express()

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
server.use(bodyParser.json())
server.use(cors({ credentials: true }))
server.use(authMiddleware.initialize)

// Routes
server.use([require('./routes/auth'), require('./routes/rooms')])

server.get('/', (req, res) => res.send('Hello'));

// Error handling
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Read port and host from the configuration file
server.listen(config.port, config.host, error => {
  if (error) {
    console.error('Error starting', error)
  } else {
    console.info('Express listening on port ', config.port)
  }
})
