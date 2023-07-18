const express = require('express');
const app = express();
const engine = require('ejs-locals');
const session = require('express-session')
//const cors = require('cors');
const bodyParser = require('body-parser');
//const cookieSession = require("cookie-session");
const path = require('path');

const users = require('./controllers/users');
const ordens = require('./controllers/ordens');
const ordens_cliente = require('./controllers/ordens_cliente');

const db = require('./db');

app.use(session({ 
    secret: 'Thisisthepassword', 
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json({ type: 'application/json' }))
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/users', users)
app.use('/ordens', ordens)
app.use('/ordens_cliente', ordens_cliente)

app.use(express.static(path.join(__dirname, "build")));
app.listen(3000, () => console.log('Example app listening on port 3000!'))