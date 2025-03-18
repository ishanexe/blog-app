const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/blog', require('./routes/blog')); 

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
