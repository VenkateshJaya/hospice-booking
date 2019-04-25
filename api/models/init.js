const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI;

mongoose

.connect(db)

  .then(() => {
    console.log('Successfully connected to database')
  })

  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
