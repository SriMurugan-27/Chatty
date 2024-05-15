const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url).then(() => {
        console.log('Connected to MongoDB!!!')
    }).catch((e) => console.error(e.message));
}

module.exports = connectDB;