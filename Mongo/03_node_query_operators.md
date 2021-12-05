# Query Operators

Query operators help you find, update, and delete documents. So far, you know how to query a single document or all documents. But you don't know how to get more than one document but less than all documents.

For instance, to target a specific document, you can pass an object as an argumet into the `.findOne()` method that finds a specific document by its `_id`. 

```node
one_db_user = await users_collection.findOne({
      _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
    });
```

To get all documents, you pass an empty object as the argument or pass no argument at all.

```node
all_db_users_empty = await users_collection.find({});
all_db_users_blank = await users_collection.find();
```

But what if you want to get more than one document but less than all documents?

Knowing how to select a subset of documents is important when working with databases because it can make your application more efficient. It may be tempting to retrieve all documents from a collection and then filter the results in your server-side or client-side code. However, what happens when your userbase becomes so large that retrieving all users and filtering in your server code significantly slows down your application?

In this chapter, you will learn how to retrieve a subset of documents from your collection. Specifically, you will learn how to pass objects as arguments to MongoDB methods (e.g., `.find()`, `update()`, etc.) in order to specify which documents you want. In your argument objects, you will use comparison and logical operators to designate which documents you want from your collection.

The following sections explain how to use comparison operators and logical operators to craft targeted database queries.

## [List of comparison operators](#list-of-comparison-operators)

Comparison operators compare two or more values. Examples of comparison operators are greater than, less than, greater than or equal to, and less than or equal to. You should be familiar with comparison operators from other programming languages. 

MongoDB comparison operators allow you to get a subset of documents based on a comparison. Instead of either getting one document by its `_id` or else all documents, you can get only the documents that have a *field* with a *value* that meets the *condition* of your comparison operator. For instance, you can retrieve only the documents that have a field named `score` with a value greater than `10`. Or you can get documents that have a field named `first_name` with a value of `'Jane'`. 

Using comparison operators in MongoDB is similar to but different from using comparison operators in other programming languages. The similarities are conceptual. For instance, greater than is greater than. Less than is less than. 

Some key differences are syntax and order of operations. MongoDB uses syntax like `$gt` and `$lt`, whereas languages like JavaScript use mathematical symbols like `>` and `<`. Plus, you use comparison operators generally throughout your code in other languages, whereas in MongoDB they belong inside an object that serves as an argument inside a function call (e.g., `find({ score: { $eq: 10 } })`). 

In addition to syntax differences, another difference between comparison operators in MongoDB and other languages is the order of operations. In MongoDB, unlike many programming languages, the order of operations is not the same as for algebra. To understand the MongoDB comparison order, visit [MongoDB's page about comparison/sort order](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/). Before worrying too much about order of operations, try practicing with simple examples.

Here is a list of MongoDB comparison operators.

`$eq`  Equal to: Matches values that are equal to a specified value.  
`$gt`  Greater than: Matches values that are greater than a specified value.  
`$gte`  Greater than or equal to: Matches values that are greater than or equal to a specified value.  
`$in`  In an array: Matches any of the values specified in an array.  
`$lt`  Less than: Matches values that are less than a specified value.  
`$lte`  Less than or equal to: Matches values that are less than or equal to a specified value.  
`$ne`  Not equal to: Matches all values that are not equal to a specified value.  
`$nin`  None: Matches none of the values specified in an array.  

Seeing some examples below will demonstrate.

## [Examples of comparison operators](#examples-of-comparison-operators)

The following examples using MongoDB comparison operators demonstrate how they work. For the examples in this section, assume your database has the following documents in the users collection:

```node
{
  _id: 5fb3865234d40445e378b67f,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript', 'python' ],
  score: 3
}
{
  _id: 5fb3865234d40445e378b680,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript' ],
  score: 9
}
{
  _id: 5fb3865234d40445e378b681,
  first: 'John',
  last: 'Doe',
  languages: [ 'python', 'java' ],
  score: 10
}
{
  _id: 5fb3865234d40445e378b682,
  first: 'Jack',
  last: 'Hill',
  languages: [ 'java', 'ruby', 'javascript' ],
  score: 6
}
{
  _id: 5fb3865234d40445e378b683,
  first: 'Jill',
  last: 'Hill',
  languages: [ 'ruby' ],
  score: 8
}
```

### Example: **Greater Than**

Starting with a simple 'greater than' comparison using the `$gt` operator. This operator matches documents where the value of a field is greater than the specified value. The following script uses the `.find()` method to retrieve only the documents that have a `score` field with a value greater than `5`. The example script below is simialr to examples you've seen in previous sections. The line to pay special attention to is `filtered_db_users = await users_collection.find({ score: { $gt: 5 } });`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "connection_string";
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

    filtered_db_users = await users_collection.find({ score: { $gt: 5 } });

    filtered_db_users.forEach((user) => {
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

In the example above, the line `filtered_db_users = await users_collection.find({ score: { $gt: 5 } });` searches for documents that have a score greater than 5. Inside of the `.find()` method, the example passes an object as an argument. That object is `{ score: { $gt: 5 } }`. The object's key is `score`. This is the field that the `.find()` method looks for to do the comparison. 

The value for the `score` field in the object is another object `{ $gt: 5 }`. This object has the comparison operator of `$gt` as it's key and the number `5` as its value. 

If you console log `filtered_db_users`, you see in the console a large Cursor object. Review it to see if anything useful exists there for you. If, however, you loop through `filtered_db_users` and console log each item as you loop through (e.g., the `.forEach()` loop in the example above), you see each document returned from your query. 

```node 
{
  _id: 5fb3865234d40445e378b680,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript' ],
  score: 9
}
{
  _id: 5fb3865234d40445e378b681,
  first: 'John',
  last: 'Doe',
  languages: [ 'python', 'java' ],
  score: 10
}
{
  _id: 5fb3865234d40445e378b682,
  first: 'Jack',
  last: 'Hill',
  languages: [ 'java', 'ruby', 'javascript' ],
  score: 6
}
{
  _id: 5fb3865234d40445e378b683,
  first: 'Jill',
  last: 'Hill',
  languages: [ 'ruby' ],
  score: 8
}
```

Notice that the users collection of documents as a whole has 5 documents (see the documents at the top of this section). The `.find()` comparison query in the example above, however, returns only 4 documents. That's because 1 of the 5 documents in the users collection has a `score` of `3`. Because `3` is not greater than `5`, that document is not included in the return of the `.find()` method in the example above.

### Example: **in**

Next, use the `$in` operator to filter for documents that have a field containing a value that is an array. If the field's value is an array, then `$in` selects only the documents whose field holds an array that contains at least one element that matches a value in the specified array. 

The following script uses the `.find()` method to retrieve only the documents that have a `languages` field with a value of an array containing the string `'javascript'`. The example script below is simialr to examples you've seen in previous sections. The line to pay special attention to is `filtered_db_users = await users_collection.find({languages: { $in: ["javascript"] }});`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "connection_string";
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

    filtered_db_users = await users_collection.find({
      languages: { $in: ["javascript"] },
    });

    filtered_db_users.forEach((user) => {
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

In the example above, the line `filtered_db_users = await users_collection.find({languages: { $in: ["javascript"] }});` searches for documents that have a languages array containing `'javascript'`. Inside of the `.find()` method, the example passes an object as an argument. That object is `{languages: { $in: ["javascript"] }`. 

The object's key is `languages`. This is the field that the `.find()` method looks for to do the comparison. The value for the `languages` field in the object is another object `{ $in: ["javascript"] }`. This object has the comparison operator of `$in` as it's key and an array `["javascript"]` as its value. Although the array contains only one item, you still need to include it within an array (as opposed to just a string) because otherwise you receive an error message.

If you console log `filtered_db_users`, you see in the console a large Cursor object. Review it to see if anything useful exists there for you. If, however, you loop through `filtered_db_users` and console log each item as you loop through (e.g., the `.forEach()` loop in the example above), you see each document returned from your query. 

```node 
{
  _id: 5fb3865234d40445e378b67f,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript', 'python' ],
  score: 3
}
{
  _id: 5fb3865234d40445e378b680,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript' ],
  score: 9
}
{
  _id: 5fb3865234d40445e378b682,
  first: 'Jack',
  last: 'Hill',
  languages: [ 'java', 'ruby', 'javascript' ],
  score: 6
}
```

Notice that the users collection of documents as a whole has 5 documents (see the documents at the top of this section). The `.find()` comparison query in the example above, however, returns only 3 documents. That's because 2 of the 5 documents in the users collection have a `langauges` field that does not contain `'javascript'`.

Now try adding more items to the array in your comparison object `{ $in: ["javascript"] }`. For instance, what happens when you add `'python'` to the filter `{ $in: ["javascript", "python"] }`?

### Example: **not equal to**

Next, use the `$ne` operator to filter for documents that do not have a field containing a value equal to the specified value. This operator returns documents that *do not contain the field* and also documents that contain the field but with a value *not equal* to the specified value. 

The following script uses the `.find()` method to retrieve only the documents that have a `first` field with a value not equal to `'Jane'`. The example script below is simialr to examples you've seen in previous sections. The line to pay special attention to is `filtered_db_users = await users_collection.find({first: { $ne: "Jane" }});`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "connection_string";
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

    filtered_db_users = await users_collection.find({
      first: { $ne: "Jane" },
    });

    filtered_db_users.forEach((user) => {
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

In the example above, the line `filtered_db_users = await users_collection.find({first: { $ne: "Jane" }});` searches for documents that have a `first` field not equal to `'Jane'`. Inside of the `.find()` method, the example passes an object as an argument. That object is `{ first: { $ne: "Jane" } }`. 

The object's key is `first`. This is the field that the `.find()` method looks for to do the comparison. The value for the `first` field in the object is another object `{ $ne: "Jane" }`. This object has the comparison operator of `$ne` as it's key and the string `'Jane'` as its value. 

If you console log `filtered_db_users`, you see in the console a large Cursor object. Review it to see if anything useful exists there for you. If, however, you loop through `filtered_db_users` and console log each item as you loop through (e.g., the `.forEach()` loop in the example above), you see each document returned from your query. 


```node 
{
  _id: 5fb3865234d40445e378b681,
  first: 'John',
  last: 'Doe',
  languages: [ 'python', 'java' ],
  score: 10
}
{
  _id: 5fb3865234d40445e378b682,
  first: 'Jack',
  last: 'Hill',
  languages: [ 'java', 'ruby', 'javascript' ],
  score: 6
}
{
  _id: 5fb3865234d40445e378b683,
  first: 'Jill',
  last: 'Hill',
  languages: [ 'ruby' ],
  score: 8
}
```

Notice that the users collection of documents as a whole has 5 documents (see the documents at the top of this section). The `.find()` comparison query in the example above, however, returns only 3 documents. That's because 2 of the 5 documents in the users collection each have a `first` of `'Jane`. 

## [List of logical operators](#list-of-logical-operators)

Logical operators allow you to use simple logic to craft powerful searches. The MongoDB logical operators are `and`, `not`, `or`, and `nor`. You should be familiar with logical operators from other programming languages. 

Like comparison operators, MongoDB logical operators allow you to get a subset of documents from a collection. Instead of using comparisons, you use logic. For instance, you can get from a collection a subset of documents that meet one condition `and` another condition. To give a specific example, you can retrieve only the documents that have both a field named `score` with a value greater than `10` **`and`** also a field named `first_name` with a value of `'Jane'`.  

Or you can get a subset of documents that meet one condition `or` a different condition. For instance, you can retrieve only the documents that have either a field named `score` with a value greater than `10` **`or`** a field named `first_name` with a value of `'Jane'`.  

Using logical operators in MongoDB is similar to using logical operators in other programming languages. The main difference is syntax. Like for comparison operators, MongoDB uses syntax like `$and` and `$not`, whereas languages like JavaScript use other syntax like `&&` or `||`.  In other languages, comparison operators are generally used throughout your code, whereas in MongoDB they belong inside an object that serves as an argument inside a function call (e.g., `find({ score: { $not: 10 } })`). Pay close attention to the syntax for each logical operator because each has its own subtle nuances.

Here is a list of MongoDB logical operators. 

`$and`  Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.  
`$not`  Inverts the effect of a query expression and returns documents that do not match the query expression.  
`$nor`  Joins query clauses with a logical NOR returns all documents that fail to match both clauses.  
`$or`  Joins query clauses with a logical OR returns all documents that match the conditions of either clause.  

You can combine logical operators with comparison operators to make some powerful queries. You can also use logical operators without comparisons. Regardless, seeing some examples below will demonstrate.

## [Examples of logical operators](#examples-of-logical-operators)

For the examples in this section, assume your database has the the same documents in the users collection as for the comparison operators examples above.

### Example: **and**

The `$and` operator operates on an array of one or more expressions. The documents that satisfy all the expressions in the array are the documents that the `$and` operator returns in the Cursor object. If the first expression in the array evaluates to false, MongoDB does not evaluate the remaining expressions.

At first, the syntax might be a little tricky. If, however, you take the time to study it, it's not so bad. 

Into the `.find()` method, you pass an object. That object's key is the `$and` operator and its value is an array of objects. Each object in the array has a key that corresponds to a field in your MongoDB documents and a value that either is an expression (like `$gt`, `$lte`, etc.) or just a value (like `10`, `'Jane'`, etc.).

Starting simple, the example below uses the `$and` operator with an array of two objects. Each of the two objects have a value of a string. Specifically, the example looks for documents that have a `first` key with a value of `'Jane'` and a `last` key with a value of `'Doe'`. The example script below is simialr to examples you've seen in previous sections. The line to pay special attention to is `filtered_db_users = await users_collection.find({$and: [{ first: "Jane" }, { last: "Doe" }]});`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "connection_string";
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

    filtered_db_users = await users_collection.find({
      $and: [{ first: "Jane" }, { last: "Doe" }],
    });

    filtered_db_users.forEach((user) => {
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

In the example above, the line `filtered_db_users = await users_collection.find({$and: [{ first: "Jane" }, { last: "Doe" }]});` searches for documents that have a `first` field equal to `'Jane'` and a `last` field eual to `'Doe'`. 

Inside of the `.find()` method, the example passes an object as an argument. That object is `{ $and: [{ first: "Jane" }, { last: "Doe" }] }`. The key is `$and` and the value is an array of objects `[{ first: "Jane" }, { last: "Doe" }]`. Each object has as a key corresponding to one of the fields expected in your documents. For the key in each object, the value is a string.

If you console log `filtered_db_users`, you see in the console a large Cursor object. Review it to see if anything useful exists there for you. If, however, you loop through `filtered_db_users` and console log each item as you loop through (e.g., the `.forEach()` loop in the example above), you see each document returned from your query. 

```node
{
  _id: 5fb3865234d40445e378b67f,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript', 'python' ],
  score: 3
}
{
  _id: 5fb3865234d40445e378b680,
  first: 'Jane',
  last: 'Doe',
  languages: [ 'javascript' ],
  score: 9
}
```

Notice that the users collection of documents as a whole has 5 documents (see the documents at the top of this section). The `.find()` comparison query in the example above, however, returns only 2 documents. That's because only 2 of the 5 documents in the users collection have a `first` of `'Jane` and `last` of `'Doe'`. Also notice that the two documents returned are in fact different documents. They have different `_id`, `languages`, and `score` values. 

### Example: **not**

Unlike the `$and` logical operator that operates on an array of objects, the `$not` operator operates on a single object. This operator returns only the documents that do not match the object on which it operates. 

Not only does this operator return only the documents that contain the field but with a value that does not match the query object, it also returns documents that do not contain the field. In other words, not having the field entirely is treated the same as having the field but with a value that doesn't fit the query criteria.

Like for the `$and` logical operator, at first the syntax might be a little tricky. If, however, you take the time to study it, it's not so bad. Pay close attention because some subtle but imporatnt syntactical differences exist between the `$and` and `$not` operators.

Into the `.find()` method, you pass an object with two other objects nested inside where one of those nested objects is nested inside the other `{ field: { $not: { <operator-expression> } } }`. 

Unlike the `$and` operator that has `$and` as the key of this outermost object, when using the `$not` operator, you use a field from your documents as the key. As the value for that key, use an object. That object should have a key of `$not` and a value. That value is another object. That object should contain as its key another operator, like `$eq`, `$gt`, `$lte`, or others. The value of this innermost object is just a value (like `10`, `'Jane'`, etc.).

Starting simple, the example below uses the `$not` operator to find all the documents that do not have a field `first` containing a value equal to `'Jane'`. The example script below is simialr to examples you've seen in previous sections. The line to pay special attention to is `filtered_db_users = await users_collection.find({first: { $not: { $eq: "Jane" } }});`.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "connection_string";
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

    filtered_db_users = await users_collection.find({
      first: { $not: { $eq: "Jane" } },
    });

    filtered_db_users.forEach((user) => {
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

In the example above, the line `filtered_db_users = await users_collection.find({first: { $not: { $eq: "Jane" } }});` searches for documents that have a `first` field. For documents that have a `first` field, MongoDB checks whether those documents have a `first` field not equal to the value `'Jane'`.

Inside of the `.find()` method, the example passes an object as an argument. That object is `{first: { $not: { $eq: "Jane" } }}`. The key is `first` and the value is an object `{ $not: { $eq: "Jane" } }`. Inside that object is the key of `$not` and the value of another object `{ $eq: "Jane" }`. Inside this innermost object is a key of `$eq` and the value of `'Jane'`.  

If you console log `filtered_db_users`, you see in the console a large Cursor object. Review it to see if anything useful exists there for you. If, however, you loop through `filtered_db_users` and console log each item as you loop through (e.g., the `.forEach()` loop in the example above), you see each document returned from your query. 

```node
{
  _id: 5fb3865234d40445e378b681,
  first: 'John',
  last: 'Doe',
  languages: [ 'python', 'java' ],
  score: 10
}
{
  _id: 5fb3865234d40445e378b682,
  first: 'Jack',
  last: 'Hill',
  languages: [ 'java', 'ruby', 'javascript' ],
  score: 6
}
{
  _id: 5fb3865234d40445e378b683,
  first: 'Jill',
  last: 'Hill',
  languages: [ 'ruby' ],
  score: 8
}
```

Notice that the users collection of documents as a whole has 5 documents (see the documents at the top of the previous section). The `.find()` comparison query in the example above, however, returns only 3 documents. That's because only 3 of the 5 documents in the users collection do not have a `first` equal to `'Jane`.

### The other logical operators

Look at the documentation for the logical operators to understand their syntax. For the logical operators that do not have examples in this chapter, compare their syntax to those operators that do have examples. Is the syntax more like `$and` or `$not`?

## [Miscellaneous but common ways to search](#miscellaneous-but-common-ways-to-search)

### Combining operators

Combining operators can make your searches very powerful. Combine logical and comparison operators with one another in addition to combining them with other search filters, like `sort`, `limit`, and `exists`.

```node
async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    filtered_db_users = await users_collection.find({
      first: { $not: { $eq: "Jill" } },
      $and: [{ last: "Hill" }],
    });

    filtered_db_users.forEach((user) => {
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

In this example, you search for documents that have a `first` field not equal to `Jill` and also a `last` field equal to `Hill`. Notice that the item passed into the `.find()` method is an object.

```node
{
      first: { $not: { $eq: "Jill" } },
      $and: [{ last: "Hill" }],
}
 ```
 
Inside the object are comma-separated key-value pairs. Each key-value pair has a specific syntax depending upon which operator you're using. Notice at least two things. First, the `$` is used to specify that it's a MongoDB operator. This is helpful to remember when reading search queries. Second, the keys that correspond to fields in your database are not wrapped in quotes.


### Sorting

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://User1:test@cluster0.n5f5h.mongodb.net/<dbname>?retryWrites=true&w=majority";
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

    sort = { score: 1 };
    filtered_db_users = await users_collection.find().sort(sort);

    filtered_db_users.forEach((user) => {
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

Here's how `sort` works above. First, you declare an object having a field and value. The field is a field in your database by which you want to sort. The value is either `1` or `-1`, which correspond to ascending and descending. That object should have `$exists` as its key and a boolean as its value. Set `$exists` to `true` to get all documents with the field or `false` to get all documents that do not have the declared field.

### Sorting and Limiting

Sort and limit your results. When sorting and limiting together, be sure to use a *stable sort*. To stable sort, declare a field by which you are sorting, like in the examples above and below, and also include in the sort a field that contains exclusively unique values (like `_id`). This helps ensure that you get the same order returned every time regardless of whether the field your are sorting within has duplicate values.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://User1:test@cluster0.n5f5h.mongodb.net/<dbname>?retryWrites=true&w=majority";
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

    sort = { score: -1, _id: -1 };
    filtered_db_users = await users_collection.find().sort(sort).limit(2);

    filtered_db_users.forEach((user) => {
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

Here's how `sort` works above. First, you declare an object having a two fields, each having a value. You have two fields because one of them -- `score` -- is not guaranteed to have unique values. The other field -- `_id` -- should have only unique values. Therefore, the documents returned will be sorted by `score`, and any duplicate values with be sorted with respect to one another by `_id`. 

### Exists

Check whether a field exists in document and retrieve only documents that either have or do not have that field.

```node
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://User1:test@cluster0.n5f5h.mongodb.net/<dbname>?retryWrites=true&w=majority";
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

    without_field = { score: { $exists: false } };
    filtered_db_users = await users_collection.find(without_field);

    filtered_db_users.forEach((user) => {
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

Here's how `$exists` works above. Declare a field (e.g., `score`) and make its value an object. That object should have `$exists` as its key and a boolean as its value. Set `$exists` to `true` to get all documents with the field and `false` to get all documents that do not have the declared field.

### Return only certain fields

You can tell MongoDB to return only certain fields in the documents. To do so, pass an argument into the MongoDB method's [projection parameter](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/). The projection is an optional argument that restricts the fields returned from a MongoDB query. It is the second argument. 

Pass this arugment as an object that contains comma-separated key:value pairs where the key is the field and value is either '`1` or `0`. See below for a note about Node syntax. 

Here is an example of retrieving all documents from a collection and telling MongoDB which fields to include for each document:

```node
users_collection.find({}, {first: 1, last: 1} )
```

The example above returns all documents, and for each document it returns only the `first`, `last`, and `_id` fields. You explicitly included the `first` and `last` fields, and by default MongoDB includes the `_id` field. 
 
As you can see from above, if a key has a value of `1`, it means to include this field. You are explicitly telling MongoDB which fields to return. It therefore will return only those fields plus, by default, it also returns the `_id` field. If you do not want the `_id` field, you can explicitly exclude it by giving it a value of `0`. 

Here is an example that returns only the `first` field:  

```node
users_collection.find({}, { { first: 1, _id: 0 } })
```

In this example, you explicitly include only the `first` field and you explicitly exclude the `_id` field. Therefore, for each document, MongoDB returns to you only the `first` field.

Instead of choosing which fields by explicit inclusion, you can choose which fields MongoDB returns by using explicit exclusion. If a key in your projection object has a value of `0`, it means to exclude this field. MongoDB therefore will return all the fields except those that are explicitly excluded. You are explicitly telling MongoDB which fields to *not* return. 

Here is an example where you ask MongoDB to return all documents with all their fields except the `first` and `last` fields:

```node
users_collection.find({}, {first: 0, last: 0} )
```

In the example above, you excplicitly exclude the `first` and `last` fields, so MongoDB returns for each document all fields except those two.

When using the [MongoDB projection argument in an Express application](https://poopcode.com/how-to-return-only-specific-fields-from-a-mongodb-query/), consider using the following syntax where the projection object has a key of `projection` and a value of an object. That object should have the key:value pairs by which you declare which fields to include or exclude. Here is an example:

```node
users_collection.find({}, { projection: { first: 1, _id: 0 } })
```

Finally, if your projection object explicitly excludes some values and also explicitly includes other values (i.e., one or more keys with a `0` value *and* one or more other keys with a `1` value), MongoDB will return only the fields with the `1` value and also the `_id` field unless you explicitly exclude the `_id` field.
