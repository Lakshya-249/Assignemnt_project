# After pushing this project in your Local Environment Type this command "npm install" to install the required modules required for this assignment.

# User Management API

This API provides endpoints for user management and social interactions.

## Middleware

- **restrictTouser**: Middleware to restrict access to routes under "/user" to authenticated users.
- **limiter**: Middleware to limit access to the login endpoint to prevent brute force attacks.
- **validate**:

The `validateInput` middleware is responsible for validating user input, particularly for the `/signup` endpoint. It ensures that the provided username, password, and email meet certain criteria before creating a new user account.

### Input Validation Criteria

- **Username:**
  .
- Must be at least 3 characters long.

- **Password:**

  - Must be at least 5 characters long.
  - Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

- **Email:**
  - Must be a valid email address format.

### Usage

The middleware checks the request body for the following fields:

- `username` (string, required): Username of the new user.
- `password` (string, required): Password of the new user.
- `email` (string, required): Email address of the new user.

If any of the input fields fail to meet the validation criteria, the middleware responds with a 400 Bad Request status code and an error message indicating the validation failure.

## Endpoints

### Signup

- **Method:** POST
- **Path:** /signup
- **Description:** Create a new user account.
- **Middleware:** validateInput
- **Request Body:**
  - `username` (string, required): Username of the new user.
  - `password` (string, required): Password of the new user.
- **Response:**
  - Status: 201 Created
  - Body: Newly created user object

### Delete User

- **Method:** DELETE
- **Path:** /user/delete
- **Description:** Delete the authenticated user account.
- **Middleware:** restrictTouser

### Follow User

- **Method:** PUT
- **Path:** /user/follow/:username
- **Description:** Follow another user.
- **Parameters:**
  - `username` (string, required): Username of the user to follow.
- **Middleware:** restrictTouser

### Unfollow User

- **Method:** PUT
- **Path:** /user/unfollow/:username
- **Description:** Unfollow another user.
- **Parameters:**
  - `username` (string, required): Username of the user to unfollow.
- **Middleware:** restrictTouser

### View Follower List

- **Method:** GET
- **Path:** /user/followerList
- **Description:** View the list of followers for the authenticated user.
- **Middleware:** restrictTouser

### View Following List

- **Method:** GET
- **Path:** /user/followingList
- **Description:** View the list of users followed by the authenticated user.
- **Middleware:** restrictTouser

### Update Profile

- **Method:** PUT
- **Path:** /user/updateprofile
- **Description:** Update the profile information of the authenticated user.
- **Middleware:** restrictTouser

### View Profile

- **Method:** GET
- **Path:** /user/viewprofile
- **Description:** View the profile of a user.
- **Parameters:**
  - `username` (string, required): Username of the user whose profile to view.
- **Middleware:** restrictTouser

### View My Posts

- **Method:** GET
- **Path:** /user/mypost
- **Description:** View posts created by the authenticated user.
- **Middleware:** restrictTouser

### Add Post

- **Method:** PUT
- **Path:** /user/addpost
- **Description:** Add a new post for the authenticated user.
- **Middleware:** restrictTouser

### Update Post

- **Method:** PUT
- **Path:** /user/updatepost
- **Description:** Update a post created by the authenticated user.
- **Middleware:** restrictTouser

### Delete Post

- **Method:** DELETE
- **Path:** /user/deletepost
- **Description:** Delete a post created by the authenticated user.
- **Parameters:**
  - `postId` (string, required): ID of the post to delete.
- **Middleware:** restrictTouser

### View Following Posts

- **Method:** GET
- **Path:** /user/followingposts
- **Description:** View posts from users that the authenticated user is following.
- **Middleware:** restrictTouser

### Login

- **Method:** POST
- **Path:** /login
- **Description:** Authenticate and login a user.
- **Middleware:** limiter
- **Request Body:**
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
- **Response:**
  - Status: 200 OK
  - Body: JWT token for authenticated user

### Logout

- **Method:** POST
- **Path:** /logout
- **Description:** Logout the authenticated user.
- **Middleware:** restrictTouser
