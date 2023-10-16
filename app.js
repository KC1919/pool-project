const express = require('express');
const app = express();
const ejs = require('ejs');
const PORT = 3000;
// const path = require('path')
// const socketio = require('socket.io');


const cookieParser = require('cookie-parser');

require('dotenv').config({
    path: './config/.env'
});

const connectDb = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view-engine', ejs);
app.use(express.static("public"));
app.use(cookieParser());


const authRouter = require('./routes/authRoutes');
const itemRouter = require('./routes/itemRoutes');
const customRouter = require('./routes/customerRoutes');
const orderRouter = require('./routes/orderRoutes');
const saleRouter = require('./routes/saleRoutes');
const tableRouter = require('./routes/tableRoutes');
const membershipRouter = require('./routes/membershipRoutes');


// const io = socketio(server);

// app.set("socketio", io);


app.get('/', (req, res) => {
    try {
        res.render('home.ejs');
    } catch (error) {
        console.log("Failed to render home page: ", error.message);
        alert("Failed to render home page: ", error.message);
    }
})


app.use('/auth', authRouter);
app.use('/item', itemRouter);
app.use('/customer', customRouter);
app.use('/order', orderRouter);
app.use('/sale', saleRouter);
app.use('/table', tableRouter);
app.use('/membership', membershipRouter);


app.listen(PORT, (err) => {
    console.log('Server listening on port: ' + PORT);
    connectDb();
})

// io.on('connection', socket => {
//     console.log('Client connected');
// })