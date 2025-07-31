const express = require('express');

// const donorsRoutes = require('./Modules/routes/donorsRoutes');

const app = express();

app.use(express.json());

// app.use('/donors', donorsRoutes);

module.exports = app;