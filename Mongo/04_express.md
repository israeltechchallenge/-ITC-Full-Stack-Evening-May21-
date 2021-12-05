# Using MongoDB in an Express Application

In the previous chapters, you learned the MongoDB basics. Although you worked with MongoDB code, you haven't yet connected that code to a server. In this chapter, you will build an Express server and connect it to MongoDB. You also will write routes and work with the data from MongoDB inside your Express app. 

This chapter is different than previous ones. Previous chapters were instructional and demonstrative, whereas this chapter is more of a resources page. It provides a rough roadmap for building an Express app that connects to MongoDB. The end of this chapter contains tips, thoughts, and resources to help you get started with MongoDB, including a sample script for a basic Express-MongoDB application.

## Step 1. Setup Express

1. What imports do you need for Express?
2. How do you create an instance of the Express class?
3. Do you know now of other imports you will need to start your Express server?
4. How do you get your Express server to run and stay active?

## Step 2. Connect Express to MongoDB

1. What are the steps for connecting your Express app to MongoDB Atlas?

- Do you need to install or import any software?
- Do you have a MongoDB connection string?
- What are you naming your database?
- What are you naming your collection?

2. How can you confirm that the connection is successful?

- Do you need to?
- What are the pros and cons?

## Step 3. Get all users

1. Write the boilerplate for the route

- Which http method should you use?
- For whichever http method you use, how many arguments does that Express method accept?
- What are the data types those arguments?
- How will you handle errors inside your route function?

2. Write your MongoDB request

- Which MongoDB method should you use to get all users?
- How do you write the line of code to use that method?
- Upon receiving a response from MongoDB, do you need to process the response before serving it to the client?
- How do you serve the response to the client?
- Do you need to install any extra packages?

## Step 4. Get one user

1. Write the boilerplate for the route

- Which http method should you use?
- For whichever http method you use, how many arguments does that Express method accept?
- What are the data types of those arguments?
- How will you handle errors inside your route function?
- When you send the request from the client, what information should you send to tell the server which user you want?
- How will you send the information from the client to the server?
- Inside your route, how will you access the information that identifies the user requested by the client?

2. Write your MongoDB request

- Which MongoDB method should you use to get a single user?
- How do you write the line of code to use that method?
- What data type do you pass into the MongoDB method as an argument?
- Upon receiving a response from MongoDB, do you need to process the response before serving it to the client?
- How do you serve the response to the client?
- Do you need to install any extra packages?

## Step 5. Add a user

1. Write the boilerplate for the route

- Which http method should you use?
- For whichever http method you use, how many arguments does that express method accept?
- What are the data types of those arguments?
- How will you handle errors inside your route function?
- What information do you need to send from the client to the server?
- How will you send that information?
- Inside your route, how will you get the information sent from the client?

2. Write your MongoDB request

- Which MongoDB method should you use to add a new user?
- How do you write the line of code to use that method?
- What data type do you pass into the MongoDB method as an argument?
- How will you know if the user was successfully added to the MongoDB database?
- How will you let the client know whether the user was successfully added?
- Do you need to install any extra packages?

## Step 6. Think about the possibilities

1. Upon receiving a response from MongoDB in your Express application for a **get** request, what information might you want to use to request more information from MongoDB (before even responding to the client)?
2. Upon receiving a response from MongoDB in your Express application for a **post** request, what information might you want to use to request more information from MongoDB (before even responding to the client)?
3. When storing information in a database, how will you organize your information?
4. If in addition to a user collection, you also have a blog collection containing blog posts by each user, how will you know which user is the author for each blog post?
5. How much search filtering should you do using MongoDB tools versus in your Express server script?
6. Does MongoDB have a way to sort documents in a response?
7. Does MongoDB have a way to count documents in a response?
8. Does MongoDB have a way to limit documents in a response?
9. Does MongoDB have a way to sort and limit?
10. Does MongoDB have a way to search text in documents?
11. Does MongoDB have a way to check whether a document has a certain field?

## Step 7. Consider these tips and thoughts
1. Take the time to learn how to connect your MongoDB cluster to your application. You need to know how to handle MongoDB account permissions, Cluster user permissions, connection strings, and IP addresses. It's not hard, but not knowing the ins and outs can lead to hours of looking in the wrong places to get your application working properly with MongoDB. When running your application, if you see an error like `MongoNetworkError: failed to connect to server [cluster.yours] on first connect [MongoNetworkError: connection 5 to cluster-yours closed`, then something is wrong with your permissions, connection string, or IP address.

2. Take the time to properly learn how to hide your private MongoDB access information during development. It's tempting to cut corners when setting up your MongoDB connection by not hiding your private MongoDB information, especially when you're eager to write code and engineer your project. However, it's really important that you know how to secure your information. To hide your private information, use environment variables. For development purposes, store the environment variables in a file, add that file name to the `gitignore` file, and pull the information from your `gitignore` file into your app. This prevents your private file from saving on GitHub, yet allows you to use the private information in your application during development. Research the "node" way for doing this. 

3. If using environment variables, take the time to properly learn how to use environment variables in production. If for production you deploy your application from your GitHub repository, the environment variables will not be there. So, when you go to production, remember to add your environment variables to the production environment. The way to set environment variables for production depends upon how you deploy your application. Heroku, for instance, has clear instructions online and makes it easy to add environment variables.  

4. MongoDB can be used with many different programming languages. When searching online to learn how to do something, be sure to include "Node" and "MongoDB" in your searches to help target answers. This is particularly helpful for getting the proper syntax. It can be helpful to review posts online that relate to MongoDB with languages other than NodeJS to help find the right approach. But beware that the syntax may vary some between that language and Node.  

5. Sometimes your application will encounter an error because of a mismatch between what your code expects from the database and what your database has in it. When you get this kind of error, fix your code so that it can gracefully handle the situation without crashing. Also, clean up your database so that it matches what the code expects from it.  

6. Practice reading error messages. Don't skim them. Read them carefully and think about what they mean. When you have an error, use the relevant part of the error message to search online.  

7. MongoDB has great documentation on the basics. Use it. Their documentation can sometimes be confusing when it comes to more advanced usage. So beware.  

8. Let's find some good StackOverflow Answers

- [Cannot find module mongodb](https://stackoverflow.com/questions/14226410/node-js-cannot-find-module-mongodb)  
- [User not allowed to do action](https://stackoverflow.com/questions/46649390/mongoerror-user-is-not-allowed-to-do-action)  
- [Avoid "current URL string parser is deprecated" warning](https://stackoverflow.com/questions/50448272/avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars)  
- [UnhandledPromiseRejectionWarning](https://stackoverflow.com/questions/62342929/mongodb-atlas-connection-fails-with-error-mongoserverselectionerror-connection)  
- [Can't connect mongoDB atlas to heroku](https://stackoverflow.com/questions/60921484/cant-connect-mongodb-atlas-to-heroku)  
- [Find then is not a function](https://stackoverflow.com/questions/53405674/mongo-collection-find-then-is-not-a-function?noredirect=1&lq=1)  
- [Sort failure](https://stackoverflow.com/questions/49881755/failing-to-get-results-with-sort-query-in-mgo)  
- [Connection timed out](https://stackoverflow.com/questions/40216639/mongodb-connection-timed-out-error)  
- [How can I use a cursor.forEach() in MongoDB using Node.js?](https://stackoverflow.com/questions/25507866/how-can-i-use-a-cursor-foreach-in-mongodb-using-node-js)
- [db.collection is not a function](https://stackoverflow.com/a/50774639)
- [MongoDB Econnrefused](https://stackoverflow.com/questions/37576822/mongodb-mongoerror-connect-econnrefused)  
- [Async / await in express with multiple mongodb queries](https://stackoverflow.com/questions/53805076/async-await-in-express-with-multiple-mongodb-queries)  
- [Duplicate key error index in mongodb mongoose](https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose)  
- [How to sort a collection by date in MongoDB?](https://stackoverflow.com/questions/13847766/how-to-sort-a-collection-by-date-in-mongodb)  
- [Combine two OR-queries with AND in Mongoose](https://stackoverflow.com/questions/13272824/combine-two-or-queries-with-and-in-mongoose)
- [Find documents with array that doesn't contains a specific value](https://stackoverflow.com/questions/26481326/find-documents-with-array-that-doesnt-contains-a-specific-value)


## Step 8. Keep these resources in mind  

- [MongoDB Getting Started](https://docs.atlas.mongodb.com/getting-started)
- [MongoDB Fundamentals](https://docs.mongodb.com/drivers/node/fundamentals)
- [Collection Methods](https://docs.mongodb.com/manual/reference/method/js-collection/)
- [Operators Homepage MongoDB](https://docs.mongodb.com/manual/reference/operator/)
- [StackOverflow MongoDB](https://stackoverflow.com/questions/tagged/mongodb)
- [MongoDB Node Driver (NPM)](https://www.npmjs.com/package/mongodb)
- [MongoDB University - Free Learning](https://university.mongodb.com/)  
- [MongoDB Instructor-Led Training](https://www.mongodb.com/products/training/instructor-led)
- [Tutorial: Create and Query an Atlas Search Index](https://docs.atlas.mongodb.com/reference/atlas-search/tutorial)
- [Tutorials Point - MongoDB](https://www.tutorialspoint.com/mongodb/mongodb_overview.htm)
- [W3 Schools Node-MongoDB](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)
- [How to return only specific fields from a MongoDB query](https://poopcode.com/how-to-return-only-specific-fields-from-a-mongodb-query/)

## Step 9. Review this example code and get it working

Here is an example of an Express App connected to MongoDB. See if you can get it running on your computer. You'll need to consider how to connect it to your MongoDB account, whether you need to install any packages, what missing files and folders you need to add to your project folder, and anything else to get it working. 

```node
// Express setup
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let path = require("path");
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname));

//Mongo setup
const { MongoClient, ObjectID } = require("mongodb");

const url =
  "your connection string";
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = "your database name";
let users_collection = "";

client.connect().then((response) => {
  if (response.topology.s.state) {
    console.log("Status: " + response.topology.s.state);
    const db = client.db(dbName);
    // Use the collection named "users"
    users_collection = db.collection("users");
  } else {
    console.log("Problem connecting to MongoDB");
  }
});

// Express Routes
app.get("/all-users", (req, res) => {
  try {
    // Get all users from Mongo
    all_db_users = users_collection
      .find()
      .toArray()
      .then((users) => {
        res.send(users);
      });
  } catch (err) {
    res.send(
      `We have error: ${err.stack}. Sorry. We appreciate your patience while we work this out.`
    );
  }
});

app.get("/user/:id", (req, res) => {
  try {
    user_id = req.params.id;
    // Get single user from Mongo
    one_db_user = users_collection
      .findOne({
        _id: ObjectID(user_id),
      })
      .then((user_db) => {
        res.send(user_db);
      });
  } catch (err) {
    res.send(
      `We have error: ${err.stack}. Sorry. We appreciate your patience while we work this out.`
    );
  }
});


app.get("/add-user-form", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/addUserForm.html"));
});


app.post("/add-user", (req, res) => {
  try {
    newUserDB = users_collection.insertOne(req.body);
    newUserDB.then((response) => {
      res.send(response.insertedId);
    });
  } catch (err) {
    res.send(
      `We have error: ${err.stack}. Sorry. We appreciate your patience while we work this out.`
    );
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```
