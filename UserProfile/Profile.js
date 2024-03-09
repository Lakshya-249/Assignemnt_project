const User = require("../Database/Userdatabase");
const { errormessage } = require("../message");

let successmessage = {
  success: true,
  message: "",
};

let payloadmessage = {
  success: true,
  data: [],
};

// Function to update profile by taking data from user as request body
const updateprofile = async (req, res) => {
  const body = req.body;
  const payload = req.user;
  if (body.bio) {
    await User.updateOne({ email: payload.email }, { $set: { bio: body.bio } });
  }
  if (body.profilePictureUrl) {
    await User.updateOne(
      { email: payload.email },
      { $set: { profilePictureUrl: body.profilePictureUrl } }
    );
  }
  if (body.name) {
    await User.updateOne(
      { email: payload.email },
      { $set: { name: body.name } }
    );
  }
  if (body.username) {
    const user = await User.findOne({ username: body.username });
    if (user != null) {
      errormessage.message = "Username already in Use..";
      return res.status(400).json(errormessage);
    }
    await User.updateOne(
      { email: payload.email },
      { $set: { username: body.username } }
    );
  }
  successmessage.message = "Profile updated successfully...";
  return res.status(200).json(successmessage);
};

// Function to view user profile including name,username, bio,imageurl,email
const viewprofile = async (req, res) => {
  const payload = req.user;
  const userprofile = await User.findOne(
    { email: payload.email },
    { _id: 0, followers: 0, following: 0, posts: 0, userId: 0 }
  );
  payloadmessage.data = userprofile;
  return res.status(200).json(payloadmessage);
};

module.exports = { updateprofile, viewprofile };
