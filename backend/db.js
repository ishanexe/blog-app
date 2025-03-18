//to connect with database(mongoDB)
const mongoose = require('mongoose'); //mongoose is a library, used to inteact with mongoDB in Nodejs
const mongoURI = "mongodb+srv://ishan:toofan24@i-notebook.e1yw8.mongodb.net/blogUsers"; //connection string (27017 is def posrt for mongoDB)
//connect using atlas and them compass

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB...");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = connectToMongo;  //exporting the function
