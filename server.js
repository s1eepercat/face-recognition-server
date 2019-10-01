const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '12345',
        database: 'face_recognition_db'
    }
});

//db.select('*').from('users').then(data => {
//	console.log(data);
//});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working!') });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.imageHandler(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => { console.log(`Server is on, port ${process.env.PORT}.`) });