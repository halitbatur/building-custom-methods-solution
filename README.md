# Building custom methods

## Objectives

- Practice building custom methods using mongoose
- Practice building virtual fields

## Overview

In the previous lab we practiced CRUD operations using mongoose and express. In this lab we will create custom methods to call different to get and update differnet data from the database.

## Starter Code

You will find the following starter code in the project folder:

- Basic Express application setup in `index.js`
- Database connection setup in `db/connection.js`
- Basic blogPost and author schema in `models/blog-post.js`

All the necessary packages are already listed in `package.json`. So just run `npm install` and `npm start` to get started.

**Note**: Make sure MongoDB is running on your local machine.

## Instructions

- Add the code in the `models` folder to create the custom methods for BlogPost and Author.
- Add the code in the `controllers` folder to create the create the endpoints to get and update the data

### Part 0: Getting all the blog-posts with similar tags

Build a custom method to get all the blogs with similar tags and build the endpoint to get it.

### Part 1: Getting all the blog-posts written by a particular author

Build a custom method to get all the blog-posts written by a particular author and build the endpoint to get it.

### Part 2: Getting all the authors with the same area of expertise

Build a custom method to get all the authors with the same area of expertise and build the endpoint to get it.

### Part 3: Getting the author full name

Build a virtual field to get the full name of the author and build the endpoint to get it.

### Part 4: Updating the author full name

Create a function to update the full name of the author and build the endpoint to update it.

### Part 5: Getting the time of the blog-post creation from a different timezone

Build a virtual field to get the time of the blog-post creation in GMT (Tukrey time -3) and build the endpoint to get it.

**Hint**: Look at the test files in order to visualize how the schema and model should look like. And ofcourse Google and documentation!

## Submission

Run `npm test` to test your code. If it shows all tests have passed then you're good to go.

You can also manually test your models by creating a few API endpoints on the `index.js` file for adding and finding authors and blogposts. Then call these endpoints to test your models. You can also verify the database operations by checking the collections using any MongoDB GUI tool or Mongo shell.

Once you're ready to submit the assignment, follow these steps on your terminal:

1. Stage your changes to be committed: `git add .`
2. Commit your final changes: `git commit -m "solve assignment"`
3. Push your commit to the main branch of your assignment repo: `git push origin main`

After your changes are pushed, return to this assignment on Canvas for the final step of submission.
