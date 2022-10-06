const express = require('express')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');

const appRouter = require('./Routes/front.routes').router

const app = express()

// Parser config

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// SET VIEWS ENGINE

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.set('/img', path.join(__dirname, '/public'));
app.use(express.static(__dirname + '/public'))


app.use(session({
    secret: 'Jarnes',
    saveUninitialized: true,
    resave: true
}));
    
app.use(flash());

app.use(appRouter)

app.listen(8000, () => {
    console.log(`Serveur en écoute sur 8000`);
});