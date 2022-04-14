const express = require('express');
//const { sequelize } = require('./models')
//const logger = require("morgan");
require('dotenv').config();



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));