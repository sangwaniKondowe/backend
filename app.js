const express = require('express');
require('dotenv').config();
const AuthRoutes = require('./Routes/loginRoute')

const app = express();
app.use(express.json())

app.use(express.json())
app.use(logger("common"));
app.use(logger())


const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.json())


app.use('/login', AuthRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));