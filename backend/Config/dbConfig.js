const mongoose = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const connectDB = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUrl,connectionParams);
    console.log("MongoDB connected");
};
module.exports = connectDB;