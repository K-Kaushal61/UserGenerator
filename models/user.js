import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testapp";

// Better connection handling
if (!mongoose.connections[0].readyState) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
}

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  email: String
});

export default mongoose.model('user', userSchema);
