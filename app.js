const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const clientRoutes = require('./routes/clientRoutes');
const fornisseurRoutes = require('./routes/fornisseurRoutes');

const app = express();
app.use(bodyParser.json());

// Define configuration values directly in the code
const MONGO_URI = "mongodb://localhost:27017/mymicroservice1-db"; // Adjust as needed
const PORT = 3001; // Adjust as needed

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));

// Routes
app.use('/clients', clientRoutes);
app.use('/fornisseurs', fornisseurRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
