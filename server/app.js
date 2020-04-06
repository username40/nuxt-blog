const express = require('express')
const bodyParser = require('body-parser')
const keys = require('./keys')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(keys.MONGO_URI)
  .then(() => {console.log('mongo db connected!')})
  .catch(error => console.error(error))

module.exports = app

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

