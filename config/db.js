const mongoose = require('mongoose');

const connectDb = () => {
    try {
        const conn = mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if (conn) {
            console.log('Database connected');
        } else {
            console.log('Database connection failed');
        }
    } catch (error) {
        console.log('Database connection failed', error.message);
    }
}

module.exports = connectDb;