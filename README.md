# Building custom methods

## Objectives

- Practice building custom methods using mongoose
- Practice building virtual fields

## Overview

In the previous lab we practiced CRUD operations using mongoose and express. In this lab we will create custom methods to get and update differnet data in the database.

## Starter Code

In this assignment folder, you will find:

1. Express server setup in `/index.js` with 2 separate routers, one for blogpost API routes and one for author API routes.
2. The database connection is setup in `db/connection.js`
3. The routes are configured and connected to a controller inside the `routes` folder.
4. The initial version of the data model is created in `models/blog-post.js`. We are using the embedded approach with author embedded inside blog post.

All the necessary packages are already listed in package.json. So just run `npm install` and `npm start` to get started.

**Note**: Make sure MongoDB is running on your local machine.

## Instructions

- Add the code in the `models` folder to create the custom methods for BlogPost and Author schemas.
- Add the code in the `controllers` folder to controller functions to handle the requests.

### Part 0: Getting all the blog-posts with similar tags

Build a custom method to get all the blogs with similar tags and create the controller function to handle it.
i.e if the current blog post has tags `["tag1", "tag2"]` then get all the blog posts with tags `"tag1"` or `"tag2"`

### Part 1: Getting all the authors with the same areas of expertise

Build a custom method to get all the authors with the similar areas of expertise and create the controller function to handle it.

### Part 2: Getting the author full name

Build a virtual field called `fullName` which has a get function to get the full name of the author and build the endpoint to get it.

### Part 3: Updating the author full name

Write the set function for the `fullName` virtual field to update both the first name and last name of the author and build the endpoint to update it.

### Part 4: Getting the time of a blog-post creation from a different timezone

Create a virtual field called `createdAtGMT` to get the time of a blog-post creation in GMT (Turkey time -3) and create the controller function to handle it.

## Submission

Run `npm test` to test your code. If it shows all tests have passed then you're good to go.

You can also manually test your application by verifying the database operations using any MongoDB GUI tool or Mongo shell.

Once you're ready to submit the assignment, follow these steps on your terminal:

1. Stage your changes to be committed: `git add .`
2. Commit your final changes: `git commit -m "solve assignment"`
3. Push your commit to the main branch of your assignment repo: `git push origin main`

After your changes are pushed, return to this assignment on Canvas for the final step of submission.
