require('dotenv').config();
const express     = require('express');


const app         = express();



app.listen(process.env.PORT);


app.use('/', require('./routes/index'))



module.exports = app;