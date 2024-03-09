const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/social_network_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define the schema for the post
const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Define the schema for the followers
const followerSchema = new mongoose.Schema({
  followerId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Define the schema for the following
const followingSchema = new mongoose.Schema({
  followeeId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Define the schema for the user
const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  profilePictureUrl: { type: String, default: "" },
  posts: [postSchema],
  followers: [followerSchema],
  following: [followingSchema],
});

// Create the User model
const User = mongoose.model("Users", userSchema);

module.exports = User;
