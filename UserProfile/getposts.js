const User = require("../Database/Userdatabase");

let successmessage = {
  success: true,
  message: "",
};

let payloadmessage = {
  success: true,
  data: [],
};

const getSocialFeed = async (email, limit = 10) => {
  try {
    // Aggregation pipeline
    const pipeline = [
      // Match the documents where the user is following
      { $match: { email: email } },
      // Unwind the array of followers
      { $unwind: "$following" },
      // Lookup posts from followed users
      {
        $lookup: {
          from: "users",
          localField: "following.followeeId",
          foreignField: "userId",
          as: "followeup",
        },
      },
      // Unwind the array of posts of followee users
      { $unwind: "$followeup" },
      { $unwind: "$followeup.posts" },
      // Project the fields needed for the feed
      {
        $project: {
          userID: "$followeup.userID",
          content: "$followeup.posts.content",
          timestamp: "$followeup.posts.timestamp",
        },
      },
      // Sort the posts by timestamp in descending order
      { $sort: { "followeup.posts.timestamp": -1 } },
      // Limit the number of posts returned
      { $limit: limit },
    ];

    // Execute the aggregation pipeline
    const feed = await User.aggregate(pipeline);
    return feed;
  } catch (error) {
    console.error("Error fetching social feed:", error);
    return;
  }
};

// Add post function to add the new posts
const addpost = async (req, res) => {
  const { content } = req.body;
  const payload = req.user;
  await User.updateOne(
    { email: payload.email },
    {
      $push: {
        posts: {
          content: content,
          timestamp: new Date().toISOString(),
        },
      },
    }
  );
  successmessage.message = "New Post Added successfully";
  return res.status(200).json(successmessage);
};

// view posts to view the posts
const viewmyposts = async (req, res) => {
  const payload = req.user;
  const userposts = await User.find(
    { email: payload.email },
    { userId: 1, posts: 1, _id: 0 }
  );
  payloadmessage.data = userposts;
  return res.status(200).json(payloadmessage);
};

// update posts to update the post of the user by tAking previous and new post as parameter in request body
const updatepost = async (req, res) => {
  const payload = req.user;
  const { prevcontent, newcontent } = req.body;
  await User.updateOne(
    { email: payload.email, "posts.content": prevcontent },
    { $set: { "posts.$.content": newcontent } }
  );
  successmessage.message = "Post Updated";
  return res.status(200).json(successmessage);
};

// for deleting the post by the user by taking the content to be deleted as a parameter;
const deletepost = async (req, res) => {
  const payload = req.user;
  const { content } = req.body;
  await User.updateOne(
    { email: payload.email },
    { $pull: { posts: { content: content } } }
  );
  successmessage.message = "Post Deleted";
  return res.status(200).json(successmessage);
};

const getfollowers = async (u_email) => {
  const followers = await User.find({ email: u_email }, { followers: 1 });
  return followers;
};

const getfollowing = async (u_email) => {
  const following = await User.find({ email: u_email }, { following: 1 });
  return following;
};

module.exports = {
  getSocialFeed,
  getfollowers,
  getfollowing,
  addpost,
  viewmyposts,
  updatepost,
  deletepost,
};
