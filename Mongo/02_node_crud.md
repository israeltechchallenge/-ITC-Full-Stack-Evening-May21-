# MongoDB with NodeJS

At this stage of the process, you should have created a MongoDB Atlas account, created a cluster within your account, and added a database to your cluster. With this setup complete, you may now start interacting with your database. 

The main ways to interact with your database are using the CRUD operations. CRUD stands for **C**reate, **R**ead, **U**pdate, and **D**elete. 

- Create: **insert** one or more new entries in your database
- Read: **retrieve** one or more entries from your database
- Update: **edit** one or more entries in your database 
- Delete: **remove** one or more entries from your database. 

The syntax for the CRUD operations is fairly simple and is explained below. Despite the simplicity, a few tips and tricks will **help you master the basics**. Before discussing each CRUD operation, first you should have a better understanding of MongoDB documents.

## [MongoDB Documents](#mongodb-documents)

Each entry in a MongoDB collection is called a document. A document is a JSON-like object called a BSON. The BSON format generally looks and acts like JSON.

One of the main JSON-like features of a MongoDB document is that the structure of each document in a collection does not have to be identical to the structure of the other documents in that collection. For instance, if you have a users collection, some users may have a `first_name`, `last_name`, `birthday`, and `user_id`. 

Not all documents in that same collection, however, are required to have all the same fields. It's okay if some user documents are missing one or more of `first_name`, `last_name`, `birthday`, and `user_id`. This is different from SQL, which requires each entry (the SQL-equivalent of a document) in a table (the SQL-equivalent of a collection) to have all the same fields as the other entries in that same table.

Like the JSON format is comma-separated `key:value` pairs wrapped in curly braces `{}`, the BSON format has comma-separated `field:value` pairs wrapped in curly braces `{}`. One difference, however, is that BSON objects can store more data types than JSON. For instance, in a MongoDB document, you can store other documents and arrays of other documents. Here is an example from the [MongoDB documentation](https://docs.mongodb.com/manual/core/document/):

```
const mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
```

Here is the data type for each field in the `mydoc` object: 

- `_id` holds an `ObjectId()`
- `name` holds an embedded document that contains the fields `first` and `last`
- `birth` and `death` hold values of the Date type
- `contribs` holds an array of strings
- `views` holds a value of the `NumberLong` type for handling 64-bit integers

The `_id` field is a reserved field. Unless you add it yourself by including it in your insert method, MondgoDB automatically adds a unique `_id` value to each document created. It is common practice to not add your own `_id` field but rather to let MongoDB add it for you.

The `_id` field will always be the first field in your document. Once it's set, you cannot change the `_id` value -- it's immutable. Although the `_id` value can be any data type other than an array, MongoDB defaults to an `ObjectId` data type when creating the `_id` for you. The `_id` is used as a primary key. Its value needs to be unique. No two documents should have the same value for the `_id` field.

A few more tips about field names. Document field names are strings, cannot be or contain null, and top-level field names cannot start with a dollar sign ($).

MongoDB uses dot notation to access fields in an embedded document or items in an array. For instance, as explained in the [MongoDB documentation](https://docs.mongodb.com/manual/core/document/), the `name` field in the example above stores an embedded document. To access the `last` field in the embedded document, use dot notation like so `name.last`. 

Similar to embedded documents, for arrays use dot notation to access values. For instance, to access the third item in the array stored in the `contribs` field above, you write `"contribs.2"` because the third item is in the 2 index position. 

Using dot notation with embedded documents and arrays becomes relevant when you start writing query strings to read, update, and delete documents. For now, you should just know that this exists.

## [Create](#create)

Two main options exist for adding entries to your database. You can call a method that adds multiple documents to a collection `.insertMany()` in a single operation or you can call a method that adds one document to a collection `.insertOne()` in a single operation. 

For example, if you have a collection named `users_collection`, you can use `.insertMany()` to add `multipleUsersObject` to it, where `multipleUsersObject` is an array of objects. Or you can use `.insertOne()` to add `userObject` to it, where `userObject` is one object. 

When using either `insert` method, if the collection that you're inserting into does not yet exist, MongoDB will create the collection and also add the document(s) to it. If the collection already exists in the database, MongoDB will just add the document to it.

### .insertMany()

Starting with the `.insertMany()` method to create multiple documents in one operation. The `.insertMany()` method accepts one required argument and one optional argument `.insertMany(documents, options)`, where `documents` is required and `options` is optional.

The first argument is an array of objects. Each item in the array is an object with `key:value` pairs. It is recommended you not include an `_id` key and corresponding value in each object. Instead, MongoDB will create those for you. If, however, you do include an `_id` key and value, each value should be unique.

The second argument is an object of `options` about the insert operation. You will omit that argument for now when calling the method. Instead, you will only pass the documents argument.

To see the `.insertMany()` method in action, you can run the following script. The lines to pay special attention to are the line that defines the array of objects `multipleUsersObject` and the line that calls the `insert` method `multipleUsersDB = await users_collection.insertMany(multipleUsersObject);`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    const multipleUsersObject = [
      {
        first: "Jane",
        last: "Doe",
      },
      {
        first: "John",
        last: "Doe",
      },
      {
        first: "Jack",
        last: "Hill",
      },
      {
        first: "Jill",
        last: "Hill",
      },
    ];

    multipleUsersDB = await users_collection.insertMany(multipleUsersObject);
    console.log(multipleUsersDB);    
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

In the example above, `multipleUsersObject` is an array containing four objects. Each object has a key for `first` and one for `last`. The line `multipleUsersDB = await users_collection.insertMany(multipleUsersObject);` performs the actual `insert` operation. In the example, you pass into it only one argument -- the array of documents `multipleUsersObject`.

The `.insertMany()` method returns a large connection object. In the example above, you print that object to the console. Look through it to see what information is available to you. One `field` available in the connection object is the `insertedIds`. The value for the `insertedIds` is an object containing `_ids` for `insertMany()`. That object looks something like this:

```node
{
  '0': 5fa406ec3f4b71a70ae05dac,
  '1': 5fa406ec3f4b71a70ae05dad,
  '2': 5fa406ec3f4b71a70ae05dae,
  '3': 5fa406ec3f4b71a70ae05daf
}
```

Another `field` available in the returned connection object is the `ops` field. The `ops` field has a value of an array of objects. Each object in the array is one of the inserted documents. That array looks something like this:

```node
[
    { first: 'Jane', last: 'Doe', _id: 5fa406ec3f4b71a70ae05dac },
    { first: 'John', last: 'Doe', _id: 5fa406ec3f4b71a70ae05dad },
    { first: 'Jack', last: 'Hill', _id: 5fa406ec3f4b71a70ae05dae },
    { first: 'Jill', last: 'Hill', _id: 5fa406ec3f4b71a70ae05daf }
  ]
```

Notice that the printed documents are the same as what you inserted except the inserted copies each have an `_id`, whereas the objects in your code don't. That's because MongoDB insererted the `_id` for you!


### .insertOne()

Next is the the `.insertOne()` method to create one document in a single operation. Like `.insertMany()`, the `.insertOne()` method accepts one required and one optional argument `.insertOne(document, options)`, where `document` is required and `options` is optional.

The first argument -- `document` -- is an object. That object should contain `key:value` pairs. Like for the objects in the array for `.insertMany()`, it is recommended you not include an `_id` in the object you pass into `.insertOne()`. MongoDB will create that `_id` for you. If, however, you do include an `_id` key and value, each should be unique. No other document in your database should have that same `_id` value.

The second argument is an object of `options` about the `insert` operation. You will omit that argument for now when calling the method. Instead, you will only pass the `document` argument.

To see the `.insertOne()` method in action, run the following script. The lines to pay special attention to are the line that defines the object `userObject` and the line that calls the `insert` method `newUserDB = await users_collection.insertOne(userObject);`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    const userObject = {
      first: "Jane",
      last: "Doe",
    };

    newUserDB = await users_collection.insertOne(userObject);
    console.log(newUserDB);    
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```
In the example above, `newUserDB` is an object containing a key for `first` and one for `last`. The line `newUserDB = await users_collection.insertOne(userObject);` performs the actual `insert` operation. In the example, you pass into it only one argument -- the document.

The `.insertOne()` method returns a large connection object. In the example above, you print that object to the console. Look through it to see what information is available to you. One field available in the connection object is the `insertedId` field. The value for the `insertedId` is a string containing `_id` for the new inserted document. That string looks something like this:

```node
5fa406ec3f4b71a70ae05dab
```

Another field available in the returned connection object is the `ops` field. The `ops` field has a value of an array containing one object, which is the document inserted into the database. Even though the data type is an array, it contains only one object because you inserted only one document. That array looks something like this:

```node
[{ first: 'Jane', last: 'Doe', _id: 5fa406ec3f4b71a70ae05dab }]
```

Notice that the printed document is the same as what you inserted except the inserted copy has an `_id` field, whereas the object in your code doesn't. That's because MongoDB insererted the `_id` for you.

## [Read](#read)

Two main options exist for reading entries from your database. You can call a method that retrieves more than one document `find()` in a single operation or you can call a method that retrieves one document from a collection `.findOne()` in a single operation. 

For example, from your collection named `users_collection`, you can use `.find()` to get multiple documents that match the details that you pass into the method when calling it. In contrast, you can use `.findOne()` to get a specific document by passing into the method details about the document you want to get. 

### .find()

Starting with the `.find()` method to get all documents from the collection. The `.find()` method accepts two optional arguments-- a `query` and a `projection`, like so `.find(query, projection)`. 

The first argument is a `query`. It is the filter you can use to specify which documents you want to retrieve. It is optional because you can leave it blank. Leaving it blank returns all documents in a collection. Instead of leaving it blank, you can pass an empty object `.find({})`. This also returns all documents from the collection. For now, you will leave it blank or pass an empty object. 

The second argument is the `projection`. The `projection` declares the fields to return for each document that matches the query. If you want all the fields for each document, leave this argument blank. For now, we will not pass any `projection` argument.

In later chapters, you will practice using the `query` and `projection` parameters. For now, however, you should focus on using `.find()` with no arguments. 

Here is an example of using `.find()` with no arguments for retrieving all the documents from your `users_collection`. The code example below is very similar to the code you've seen above. The lines in the code below that you should focus on are `all_db_users = await users_collection.find();` and `all_db_users.forEach((user) => console.log(user));`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    // Get all users
    all_db_users = await users_collection.find();

    // Print each user to the console
    all_db_users.forEach((user) => console.log(user));
    
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The line `all_db_users = await users_collection.find();` retrieves all the documents from your `users_collection`. Notice that you pass no arguments into the `.find()` method. You would get the same result if you passed an empty object into the method `all_db_users = await users_collection.find({});`. 
 
The find method returns a cursor object. Console log the cursor (here it is named `all_db_users`) and look at the output, which is a long object that won't be of much use to you now. 

Instead, what is of use to you now, you can iterate the cursor to access each document in the cursor. The MongoDB documentation explains several ways to [iterate a cursor](https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/). Here's one way to iterate a cursor: `all_db_users.forEach((user) => console.log(user));`. This line of code should output something like the following in your console (your values for `_id` will differ from the ones below):

```node
{ _id: 5fa406ec3f4b71a70ae05dab, first: 'Jane', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dac, first: 'Jane', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dad, first: 'John', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dae, first: 'Jack', last: 'Hill' }
{ _id: 5fa406ec3f4b71a70ae05daf, first: 'Jill', last: 'Hill' }
```

Try something else. Instead of console logging each user, try console logging just their first names `all_db_users.forEach((user) => console.log(user.first));`. 
You should see the console print the following: 

```node
Jane
Jane
John
Jack
Jill
```

This dot notation should be familiar to you. You use it to access values inside an object. What data type is the `user`? Check the data type of the each document in the cursor `all_db_users.forEach((user) => console.log(typeof user));`. The console should print:

```node
object
object
object
object
object
```

Instead of iterating the cursor with `.forEach()`, you can use the `.toArray()` method to convert the documents into an array. According to [MongoDB's documentation](https://docs.mongodb.com/manual/reference/method/cursor.toArray/#cursor.toArray), `.toArray()` returns an array "that contains all the documents from a cursor."

### .findOne()

The `.findOne()` method finds only one document from the collection. Like the `.find()` method, the `.findOne()` method accepts two optional arguments -- a `query` and a `projection`, like so `.findOne(query, projection)`. If more than one document matches the `query`, the `.findOne()` method returns the first matching document in the collection.

Although the `.find()` and `.findOne()` methods have the same parameters (optional `query` and optional `projection`), they return different things. As you saw above, the `.find()` method returns a cursor, which is a collection of documents. In contrast, the `.findOne()` method returns a single document (not a collection of them). 

Here is an example of using `.findOne()` with no arguments for retrieving one document from your `users_collection`. The code example below is the same as the previous example. The lines in the code below that you should focus on are `one_db_user = await users_collection.findOne();` and `console.log(one_db_user);`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    one_db_user = await users_collection.findOne();

    console.log(one_db_user);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The variable `one_db_user` stores a single document. Because you didn't pass a query argument into the `.findOne()` method, the method returns the most recently inserted document. The line `console.log(one_db_user);` prints that document to the console, like so below.

```node
{ _id: 5fa406ec3f4b71a70ae05dab, first: 'Jane', last: 'Doe' }
```

Like you did for the `.find()` method above, you can console log a specific value in the returned document using dot notation `console.log(one_db_user.first);` and also console log the `typeof` the document returned `console.log(typeof one_db_user);`.

Although you may at times want to get only the most recently inserted document, it is just as (if not more) likely that you will want to get a document based on other criteria. The next chapter goes into more detail about how to get a document based on certain criteria.

For now, however, it might be helpful to see a simple example of using the `query` argument. A very common occurrence in web applications is to get from your database a user (or other specific item) by it's unique `_id`. Using the `.findOne()` method is a great way to do this. Although later you will learn about this in more detail, below is an example of using the `query` argument in `.findOne()` to get a document that has a specific `_id`.

Before showing you the example, know that you need to pay attention to at least one nuance when searching for a document by its `_id`. Knowing this nuance will help you avoid confusing errors for what seems to be a simple action. That nuance is using the `ObjectID` class. In MongoDB, the data type for `_id` is `ObjectID` (notice that `ID` has both letters capitalized; it's not `Id`). 

The problem is that NodeJS doesn't have the Mongo `ObjectID` data type built into it. You therefore need to import `ObjectID` from MongoDB and pass the `_id` as a string into the ObjectID class to convert the string to an ObjectID.  

With that introduction, here is the example of using `.findOne()` to get a document that has a specific `_id`.


```node
const { MongoClient, ObjectID } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    one_db_user = await users_collection.findOne({
      _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
    });

    console.log(one_db_user);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The code above is similar to the previous examples. One difference in this example is the very first line, which is now `const { MongoClient, ObjectID } = require("mongodb");`. This line now imports `ObjectID` from the mongodb package you installed. 

Another difference is in the `try` block. It's this line:

```node 
one_db_user = await users_collection.findOne({
      _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
    });   
```

This is the same line as the previous example `one_db_user = await users_collection.findOne();`, except this time you pass into the `.findOne()` method an object that specifies a key `_id` and value `ObjectID("5fa406ec3f4b71a70ae05dab")`. This is the `query` by which the `.findOne()` method will filter. 

In other words, the method will look for the document that has an `_id` of `ObjectID("5fa406ec3f4b71a70ae05dab")`. Notice that it is a string passed into the `ObjectID` class. The code example above logs the following to the console:

```node 
{ _id: 5fa406ec3f4b71a70ae05dab, first: 'Jane', last: 'Doe' }
```

If the method doesn't find a document matching the query filter, the method returns `null`.

## [Update](#update)

Three main options exist for updating entries in your database. You can call a method that updates one document from a collection `.updateOne()`, you can call a method that updates more than one document `.updateMany()`, or you can call a method that replaces one document `.replaceOne()` (except the `_id` field). 

You typically should use `.updateOne()` and `.updateMany()` when updating less than all of the values in the document(s). In contrast, you should use .`replaceOne()` when updating all the values (except the `_id`).

### .updateOne()

Starting with the `.updateOne()` method to update values in one document. The `.updateOne()` method accepts two required arguments (`filter` and `update`) and one optional (`options`), like so `.updateOne(filter, update, options)`. 

The first argument is a `filter`. The `filter` is like the `query` argument used for the `find` methods. You use `filter` to specify which document to update. For instance, you can specify an empty object `.updateOne({})` to update the first document in the collection. Or you can specify specific criteria, like the `_id` of a document `.updateOne({_id: ObjectID("5fa406ec3f4b71a70ae05dab")})`, to target a specific document.

The second argument is the `update`. The `update` declares the updates that you want to make in the document. Use the [update operator expressions](https://docs.mongodb.com/manual/reference/operator/update/) to update the document. While all of the update operators might help you, pay special attention to the `$set` operator. It is the one you will likely use most.

```node
Name	          Description
$currentDate	  Sets the value of a field to current date, either as a Date or a Timestamp.
$inc	          Increments the value of the field by the specified amount.
$min	          Only updates the field if the specified value is less than the existing field value.
$max	          Only updates the field if the specified value is greater than the existing field value.
$mul	          Multiplies the value of the field by the specified amount.
$rename	        Renames a field.
$set	          Sets the value of a field in a document.
$setOnInsert	  Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
$unset	        Removes the specified field from a document.
```

For now, don't worry about the `options` argument. It is optional, so you can simply just omit it when calling the method.

Here is an example of using `.updateOne()` with arguments for only `filter` and `updates` (not `options`). The code example below is very similar to the code you've seen above. The line in the code below that you should focus on is `updated_user = await users_collection.updateOne({_id: ObjectID("5fa406ec3f4b71a70ae05dab"),}, { $set: { first: "enaJ" } });`. 

```node
const { MongoClient, ObjectID } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    updated_user = await users_collection.updateOne(
      {
        _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
      },
      { $set: { first: "enaJ" } }
    );
    console.log(updated_user);

    one_db_user = await users_collection.findOne({
      _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
    });
    console.log(one_db_user);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The example above uses the .`updateOne()` method to update the document having an `_id` of `ObjectID("5fa406ec3f4b71a70ae05dab")` by changing the value of `first` from `Jane` to `enaJ`. The code then console logs the return value `updated_user`. Look through that return value in your console. It has a lot of information about the update, some of which you may want to use to help make your application more robust. 

After console logging the returned object, the example then uses the `.findOne()` method to get the same document so that you can console log it and see that the update did in fact occur. The second console log (`console.log(one_db_user)`) prints `{ _id: 5fa406ec3f4b71a70ae05dab, first: 'enaJ', last: 'Doe' }`. Update successful!

### .updateMany()

Next is the `.updateMany()` method, which updates all documents that match the `filter` criteria. Like the `.updateOne()` method, the `.updateMany()` method accepts two required arguments (`filter` and `update`) and one optional (`options`), like so `.updateMany(filter, update, options)`. 

The first argument is a `filter`. This is essentially the same for `.updateMany()` as it is for `.updateOne()`. Use the `filter` argument to specify which documents to update. Unlike the `.updateOne()` method that updates only the first matching document, the `.updateMany()` method updates all documents matching the `filter` criteria. 

For instance, you can specify an empty object `.updateMany({})` to update all the documents in the collection. Or you can specify specific criteria, like the `first` field of a document in your `users_collection`. For instance, `.updateMany({"first": "Jane")}, updates)` returns all documents that have a `first` field with a value of `"Jane"`. 

The second argument is `updates`. This is essentially the same for `.updateMany()` as it is for `.updateOne()`. The `updates` argument declares the changes you want to make to the filtered documents. Use the [update operator expressions](https://docs.mongodb.com/manual/reference/operator/update/) (listed above) to update the document. Like for `.updateOne()`, while all of the update operators might help you, pay special attention to the `$set` operator. It is the one you will likely use most.

For now, don't worry about the `options` argument. It is optional, so you can simply just omit it when calling the method.

Here is an example of using `.updateMany()` with arguments for `filter` and `updates` (no `options` argument). The code example below is very similar to the code you've seen above. The line in the code below that you should focus on is `updated_users = await users_collection.updateMany({last: "Doe",}, { $set: { first: "Joe" } });`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    updated_users = await users_collection.updateMany(
      {
        last: "Doe",
      },
      { $set: { first: "Joe" } }
    );
    console.log(updated_users);

    all_db_users = await users_collection.find({});
    all_db_users.forEach((user) => {
      console.log(user);
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The example above uses the `.updateMany()` method to update all documents having a `last` field with a value of `Doe` by changing the value of `first` to `Joe`. The code then console logs the return value `updated_users`. Look through that return value in your console. It has a lot of information about the update, some of which you may want to use to help make your application more robust. 

Notice that the code filters using the `last` field. This is a non-unique field, so it's possible that more than one document has the same value for `last`. In contrast, using `.updateMany()` and filtering by `_id` does not make the most of the method because the `_id` values are unique. In theory, no documents will share the same `_id` value and therefore you cannot update more than one document when filtering by `_id` in the `.updateMany()` method.

After console logging the returned object, the example then uses the `.find()` method to get all the documents from the collection so that you can console log them and see that the updates did in fact occur. Remember that `.find()` returns a cursor, which is a collection of documents. You therefore need to loop through it to console log each individual document in the returned collection. The block of code `all_db_users.forEach((user) => {console.log(user);});` prints the following: 

```node
{ _id: 5fa406ec3f4b71a70ae05dab, first: 'Joe', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dac, first: 'Joe', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dad, first: 'Joe', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dae, first: 'Jack', last: 'Hill' }
{ _id: 5fa406ec3f4b71a70ae05daf, first: 'Jill', last: 'Hill' }
```

Only those documents with a `last` of `"Doe"` were updated with a `first` of `"Joe"`. Update successful!

### .replaceOne()

Next is the `.replaceOne()` method, which replaces one document that matches the filter criteria. Like the `update` methods, the `.replaceOne()` method accepts two required arguments (`filter` and `replacement`) and one optional (`options`), like so `.replaceOne(filter, replacement, options)`. 

The first argument is `filter`. This is essentially the same for `.replaceOne()` as it is for the `update` methods. You use `filter` to specify which document to replace. The `.replaceOne()` method is like the `.updateOne()` method in the sense that it operates on the first document returned. Instead of updating it, the `.replaceOne()` method replaces the document. 

If you specify an empty object `.replaceOne({})`, the method replaces the first document returned in the collection. If instead of usng an empty object you use specific criteria, like the `first` field of a document in your `users_collection`, you will replace the first document that matches that criteria. For instance,  `.replaceOne({"_id": ObjectID("5fa406ec3f4b71a70ae05dab"))}, replacement)` filters for the document that has an `_id` field with a value of `ObjectID("5fa406ec3f4b71a70ae05dab")`. 

The second argument is the `replacement` object. This is similar to the `updates` argument for the `update` methods, but instead of specifying a subset of fields to replace, you specify the entire new object. Like you do for the `insert` methods, `replacement` is an object of `field:value` pairs that represents what the document will look like when updated.

MongoDB will keep the same `_id` field for the revised document as for the document before it was replaced, but it will replace all the other `fields:values` in the document with the `fields:values` in `replacement`. If you include an `_id` field in the object for `replacement`, it needs to be the same `_id` already assigned to that document. This preservation of the `_id` value is what makes this a replacement. Aside from the `_id` field, the revised document can have different fields and values as the document before it was replaced.

A few things to note. The `.replaceOne()` method doesn't use the operator expressions (like `$set`). For now, don't worry about the `options` argument. It is optional, so you can simply just omit it when calling the method.

Here is an example of using `.replaceOne()` with arguments for `filter` and `replacement` (no `options` argument). The code example below is very similar to the code you've seen above. The lines in the code below that you should focus on are `replacement_doc = {middle: "Margaret", country: "Guatemala",};` and `replaced_user = await users_collection.replaceOne({ first: "Jill" }, replacement_doc);`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    replacement_doc = {
      middle: "Margaret",
      country: "Guatemala",
    };

    replaced_user = await users_collection.replaceOne(
      { first: "Jill" },
      replacement_doc
    );
    console.log(replaced_user);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The example above uses the `.replaceOne()` method to filter for the first returned document having a `first` field with a value of `Jill`. The code replaces that document with `replacement_doc`, which is an object containing the field `middle` with a value of `Margaret` and the field `country` with a value of `Guatemala`. 

The code then console logs the return value `replaced_user`. Look through that return value in your console. It has a lot of information about the `replacement` similar to what you've seen in other return values, some of which you may want to use to help make your application more robust. 

After console logging the returned object, the example then uses the `.find()` method to get all the documents from the collection so that you can console log them and see that the replacement did in fact occur. Remember that `.find()` returns a cursor, which is a collection of documents. You therefore need to loop through it to console log each individual document in the returned collection. The block of code `all_db_users.forEach((user) => {console.log(user);});` prints the following: 

```node
{ _id: 5fa406ec3f4b71a70ae05dab, first: 'Joe', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dac, first: 'Joe', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dad, first: 'Joe', last: 'Doe' }
{ _id: 5fa406ec3f4b71a70ae05dae, first: 'Jack', last: 'Hill' }
{ _id: 5fa406ec3f4b71a70ae05daf, middle: 'Margaret', country: 'Guatemala'}
```

You successfully replaced the "Jill Hill" document with a document that has the `middle` and `country` fields and corresponding values. Notice that the `_id` of `5fa406ec3f4b71a70ae05daf` is the same value that the document had before being replaced. Replacement successful!

## [Delete](#delete)

Two main options exist for deleting entries in your database. You can call a method that deletes one document from a collection `.deleteOne()` or you can call a method that deletes more than one document `.deleteMany()`. For example, from your collection named `users_collection`, you can use `.deleteMany()` to delete multiple documents that match the details that you pass into the method when calling it. In contrast, you can use `.deleteOne()` to delete a specific document by passing into the method details about the document you want to delete.  

### .deleteMany()

Starting with the `.deleteMany()` method to delete multiple documents from the collection. The `.deleteMany()` method accepts one required argument and one optional argument `.deleteMany(query, options)`. The first argument is a `query`. The `query` is the filter you use to specify which documents to delete. To delete all documents in a collection, you can pass an empty document `.deleteMany({})` or leave the argument blank.  

The second argument is an object of options about the delete operation. You will omit that argument for now when calling the method. Instead, you will only pass the query argument or no argument at all.

Here is an example of using `.deleteMany()` for deleting all the documents from your `users_collection`. The code example below is very similar to the code you've seen above. The lines in the code below that you should focus on are `deleted_from_db = await users_collection.deleteMany();` and `console.log(deleted_from_db);`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    deleted_from_db = await users_collection.deleteMany();
    console.log(deleted_from_db);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The line `deleted_from_db = await users_collection.deleteMany();` deletes all the documents from your `users_collection`. Notice that you pass no arguments into the `.deleteMany()` method. You would get the same result if you passed an empty object into the method `deleted_from_db = await users_collection.deleteMany({});`. 

The `.deleteMany()` method returns a connection object. You console log it `console.log(deleted_from_db);`. Look through that connection object to see what information is available to you. The `.deletedCount()` may be a field you use in your work.

In the next lesson, you will learn more about using the `query` argument when calling the method.

### .deleteOne()

The `.deleteOne()` method deletes only one document from the collection. Like the `.deleteMany()` method, the `.deleteOne()` method accepts two optional arguments -- a `query` and an object of options about the delete operation `.deleteOne(query, options)`. If more than one document matches the query, the `.deleteOne()` method deletes the first document that matches the `query`, which is usually the most recently inserted document that matches.

Like for the `.deleteMany()` method, the second argument in the `.deleteOne()` method is an object of options about the delete operation. You will omit that argument for now when calling the method. Instead, you will only pass the query argument.

Here is an example of using `.deleteOne()` for deleting a single document from your `users_collection`. The code example below is very similar to the code you've seen above. The lines in the code below that you should focus on are `deleted_from_db = await users_collection.deleteOne({_id: ObjectID("5fabaef2ae39d0dca7488936"),});` and `console.log(deleted_from_db);`.

```node
const { MongoClient, ObjectID } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "your connection string";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    deleted_from_db = await users_collection.deleteOne({
      _id: ObjectID("5fabaef2ae39d0dca7488936"),
    });
    console.log(deleted_from_db);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

The line `deleted_from_db = await users_collection.deleteOne({_id: ObjectID("5fabaef2ae39d0dca7488936"),});` deletes the document from your `users_collection` that has an `_id` of `ObjectID("5fabaef2ae39d0dca7488936")`. Notice that you pass an argument into the `.deleteOne()` method similar to what you did for `.findOne()`. It's an object containing a `field:value` pair. Because the `_id` field has a unique value, using it as the filter ensures you will delete the document you wanted to delete instead of some other document on accident. 

Like the `.deleteMany()` method, the `.deleteOne()` method returns a connection object. You console log it `console.log(deleted_from_db);`. Look through that connection object to see what information is available to you. The `deletedCount` may be a field you use in your work.

In the next lesson, you will learn more about using the `query` argument when calling the method.
