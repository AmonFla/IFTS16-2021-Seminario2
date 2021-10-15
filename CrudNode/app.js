const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;



const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'S2Node1'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

// configure 
app.set('port', port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

//incluyo los controladores
const home = require('./controllers/index');
const player = require('./controllers/player');

// routes
app.get('/',home.getHomePage);
app.get('/add', player.addPlayerPage);
app.get('/edit/:id', player.editPlayerPage);
app.get('/delete/:id', player.deletePlayer);

app.post('/add', player.addPlayer);
app.post('/edit/:id', player.editPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
