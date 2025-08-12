import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://kkaushalkartik:<db_password>@kartik.cy3nrl4.mongodb.net/?retryWrites=true&w=majority&appName=Kartik";

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
