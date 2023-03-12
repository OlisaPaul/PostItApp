# PostIt App

This is a social Media App, that lets users register, login, create new posts and also reply to posts

## Features

- Users can signup and login to their accounts
- Users can create, update and delete their own accounts
- Public (non-authenticated) users can only view post and comments made by other users
- Authenticated users can create posts, reply posts. They can also modify and delete their posts and replies.

## Live Link

Here is the render [Live Link](https://postitapp.onrender.com)

## Documentation

Use the
[Postman
Documentation](https://documenter.getpostman.com/view/22093717/2s93JtR4Mm) to get a better idea on how to use the API

Database documentation can be found [here](https://dbdesigner.page.link/oaVHbQ6LhUXWZ3qB9)

## Installation

To Install the PostIt app:

- Clone this repository [here](https://github.com/OlisaPaul/PostItApp.git).
- The main branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
- Then you can test the functionality using postman.

## Usage

- Run npm start to start the application.
- Connect to the API using Postman.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`dbUri`

This dbUri is the mongodb connection string

## Deployment

To deploy this project run

```bash
  npm i
```

```bash
  node index.js
```

## API Reference

| HTTP   | Endpoints                                           | Action                                                 |
| ------ | --------------------------------------------------- | ------------------------------------------------------ |
| POST   | /api/v1/users                                       | To sign up a new user account                          |
| POST   | /api/v1/auth                                        | To login an existing user account                      |
| PUT    | /api/v1/users                                       | To modify an existing user account                     |
| GET    | /api/v1/users                                       | To retrieve all users on the platform                  |
| GET    | /api/v1/users/:id                                   | To retrieve a particular user on the platform          |
| POST   | /api/v1/posts                                       | To create a new post                                   |
| GET    | /api/v1/posts                                       | To retrieve all posts on the platform                  |
| GET    | /api/v1/posts/:postId                               | To retrieve details of a single post                   |
| PUT    | /api/v1/posts/:postId                               | To edit the details of a single post                   |
| DELETE | /api/v1/posts/:postId                               | To delete a single post                                |
| POST   | /api/v1/comments                                    | To create a new comment                                |
| GET    | /api/v1/comments                                    | To retrieve all comments on the platform               |
| GET    | /api/v1/comments/:commentId                         | To retrieve details of a single comment                |
| GET    | /api/v1/comments/post/:postId                       | To retrieve replies made on a post                     |
| GET    | /api/v1/comments/post/:postId/user/:userId          | To retrieve replies made by a user on a post           |
| GET    | /api/v1/comments/post/:post/user/:userId/:commentId | To retrieve details of a single comment made by a user |
| PUT    | /api/v1/comments/:commentId                         | To edit the details of a single comment                |
| DELETE | /api/v1/comments/:commentId                         | To delete a single comment                             |

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:**

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

## Authors

- [@OlisaPaul](https://www.github.com/OlisaPaul)
