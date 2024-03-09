const User = require("../Database/Userdatabase");
const { getSocialFeed, getfollowers, getfollowing } = require("./getposts");

let errormessage = {
  success: false,
  message: "",
};

let successmessage = {
  success: true,
  message: "",
};

let payloadmessage = {
  success: true,
  data: [],
};

// Viweing the posts of the users You follow with timestamp
const viewsposts = async (req, res) => {
  const { limit } = req.query;
  const payload = req.user;
  const posts = await getSocialFeed(payload.email, limit);
  console.log(posts);
  payloadmessage.data = posts;
  return res.status(200).json(payloadmessage);
};

// Viewing the followers you have with timestamp
const viewfollowers = async (req, res) => {
  const payload = req.user;
  // Accessing followers...
  const followers = await getfollowers(payload.email);
  if (followers.length == 0) {
    errormessage.message = "Sorry you have no followers right now.";
    return res.status(400).json(errormessage);
  }
  payloadmessage.data = followers;
  return res.status(200).json(payloadmessage);
};

// Viewing the users you follow with timestamp
const viewfollowing = async (req, res) => {
  const payload = req.user;
  // Accessing followings...
  const following = await getfollowing(payload.email);
  if (following.length == 0) {
    errormessage.message = "Sorry you do not follow anyone right now.";
    return res.status(400).json(errormessage);
  }
  payloadmessage.data = following;
  return res.status(200).json(payloadmessage);
};

// Following user by taking params(username) as parameter
const followuser = async (req, res) => {
  const payload = req.user;
  const username = req.params.username;
  // console.log(username);
  const email = payload.email;
  const my_user = await User.findOne({ email: email });
  const followuser = await User.findOne({ username: username });
  console.log(followuser.userId);
  if (followuser == null) {
    errormessage.message = "Username not found";
    return res.status(404).json(errormessage);
  }
  await User.updateOne(
    { email: email },
    {
      $push: {
        following: {
          followeeId: followuser.userId,
          timestamp: new Date().toISOString(),
        },
      },
    }
  );
  await User.updateOne(
    { username: username },
    {
      $push: {
        followers: {
          followerId: my_user.userId,
          timestamp: new Date().toISOString(),
        },
      },
    }
  );
  successmessage.message = "User followed successfully...";
  return res.status(200).json(successmessage);
};

// Unfollowing user by taking params(username) as parameter...
const unfollowuser = async (req, res) => {
  const payload = req.user;
  const username = req.params.username;
  const email = payload.email;
  const my_user = await User.findOne({ email: email });
  const followuser = await User.findOne({ username: username });
  await User.updateOne(
    { email: email },
    {
      $pull: {
        following: {
          followeeId: followuser.userId,
        },
      },
    }
  );
  await User.updateOne(
    { username: username },
    {
      $pull: {
        followers: {
          followerId: my_user.userId,
        },
      },
    }
  );
  successmessage.message = "User Unfollowed successfully...";
  return res.status(200).json(successmessage);
};

module.exports = {
  viewsposts,
  viewfollowers,
  viewfollowing,
  followuser,
  unfollowuser,
};
