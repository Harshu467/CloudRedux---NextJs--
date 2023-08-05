const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/dbConfig');
const authRoute = require('./Routes/route');
const helmet = require('helmet');
require('dotenv').config();
const port = process.env.PORT_NUMBER || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
connectDB();
app.use('/api/v1',authRoute)
app.get('/', (req, res) => {
    res.json({ message: 'Virtual Event Management System' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});