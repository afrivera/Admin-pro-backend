const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { dbConnection } = require('./db/db');

// Port appp
const port = process.env.PORT || 4000;

// create server express
const app = express();

// middlewares
app.use( express.json());
app.use( morgan('dev'))
app.use(cors());

// Database
dbConnection();

// directory publi
app.use(express.static('public'))

// Routes
app.use( '/api', require('./routes'))

app.listen( port, () => {
    console.log(`server running in port ${ port }`)
})