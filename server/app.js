const express = require('express')
const bodyParser = require('body-parser')
const app = express()

module.exports = app

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

