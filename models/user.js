import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testapp";
mongoose.connect(mongoUri);

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    email: String
});

export default mongoose.model('user', userSchema);