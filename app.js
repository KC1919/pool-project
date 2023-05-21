const express = require('express');
const app = express();
const ejs = require('ejs');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const authRouter = require('./routes/authRoutes');

const cookieParser = require('cookie-parser');

require('dotenv').config({
    path: './config/.env'
});

const connectDb = require('./config/db');

app.use(express.static('public'));
app.set('view-engine', ejs);
app.use(cookieParser());

app.use('/auth', authRouter);

app.listen(PORT, (err) => {
    console.log('Server listening on port: ' + PORT);
    connectDb();
})