const express = require("express");
const restrictTouser = require("../Authfilter/jwtfilter");
const { validateInput, createuser } = require("../Authentication/SignUp");
const {
  viewsposts,
  followuser,
  unfollowuser,
  viewfollowers,
  viewfollowing,
} = require("../UserProfile/Followers");
const deleteuser = require("../Authentication/Deleteuser");
const { limiter, signin } = require("../Authentication/Login");
const signout = require("../Authentication/Logout");
const { updateprofile, viewprofile } = require("../UserProfile/Profile");
const {
  viewmyposts,
  addpost,
  updatepost,
  deletepost,
} = require("../UserProfile/getposts");

const router = express.Router();

router.use("/user", restrictTouser);
router.use("/login", limiter);

router.post("/signup", validateInput, createuser);
router.delete("/user/delete", deleteuser);
router.post("/login", signin);
router.post("/logout", signout);
router.put("/user/follow/:username", followuser);
router.put("/user/unfollow/:username", unfollowuser);
router.get("/user/followerList", viewfollowers);
router.get("/user/followingList", viewfollowing);
router.put("/user/updateprofile", updateprofile);
router.get("/user/viewprofile", viewprofile);
router.get("/user/mypost", viewmyposts);
router.put("/user/addpost", addpost);
router.put("/user/updatepost", updatepost);
router.delete("/user/deletepost", deletepost);
router.get("/user/followingposts", viewsposts);

module.exports = router;
