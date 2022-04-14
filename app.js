const express = require('express');
require('dotenv').config();
const AuthRoutes = require('./Routes/loginRoute')

const app = express();
app.use(express.json())


app.use('/login', AuthRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));