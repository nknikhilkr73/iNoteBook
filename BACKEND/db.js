// require('dotenv').config();

const mongoose = require('mongoose');
// const mongoURI = process.env.MONGO_URI;
// console.log(mongoURII);
const mongoURI = 'mongodb+srv://nknikhilkr73:lTimO8ISQVSlN4Jq@cluster0.zoeey6c.mongodb.net/inotebook'
// console.log(mongoURI);
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("connected to mongo successfully");
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectToMongo


// require('dotenv').config();

// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGO_URI;
// console.log(mongoURI);
// console.log(process.env.Hii);
// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB successfully");
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// module.exports = connectToMongo;
