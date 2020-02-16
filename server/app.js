require('dotenv').config();

const express     = require('express');
const mongoose    = require('mongoose');
const path        = require('path');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const session     = require('express-session');
const passport    = require('passport');
require('./configs/passport');

mongoose
.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});


const app_name = require('./package.json').name;

const app         = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(session({
  secret:"mysupersecret",
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.locals.title = app_name;


app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'] // <== url of react app running on port 3000
}));


app.listen(process.env.PORT);


app.use('/', require('./routes/index'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})



module.exports = app;