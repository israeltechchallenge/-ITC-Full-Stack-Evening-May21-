# What is MongoDB?

MongoDB is a popular database platform for storing information for web applications. According to the [MongoDB website](https://www.mongodb.com/), MongoDB "is a general purpose, document-based, distributed database built for modern application developers and for the cloud era."

## [Understanding databases](#understanding-databases)

A database is an organized collection of digital data stored on a computer. In the physical world, a database is like a file cabinet or warehouse. The digital information stored within is like the papers in a file cabinet or boxes in a warehouse. Whereas a file cabinet is located in a building and a warehouse in a neighborhood, a database is located on a computer.

Like a file cabinet or warehouse needs workers who know how to find and maintain the things stored within, a database needs software for managing. Not only does MongoDB store the data, it also is the software you need to interact with the data. 

Like with many databases, with MongoDB you can interact in powerful ways with information stored within. For instance, you can search, reference, compare, change and otherwise manipulate the stored information. You can do so with optimal speed and minimal processing expense.

## [Working in the cloud with documents](#working-in-the-cloud-with-documents)

You can work locally on your computer with MongoDB or you can use MongoDB's cloud-based services. Using the cloud services, you can access your database so long as you have internet access. In this lesson, you will focus on using the cloud-based service called [MongoDB Atlas](https://docs.atlas.mongodb.com/). From their website, "MongoDB Atlas is a fully-managed cloud database."

Unlike SQL databases where you store information in tables, MongoDB is known as NoSQL because it doesn't store information in tables. Rather, it stores information in documents. 

In MongoDB, each database can have multiple collections of documents. You can fill each collection with whatever information you want, but typically a collection is made up of documents containing the same or similar information. For instance, a collection for all your users. Or a collection for all the purchases made from your e-commerce store. Or a collection for all comments made on your blog. But probably not a collection that contains a mixture of users, purchases and comments.

You can use MongoDB with many different programming languages, like NodeJS, Python, and others. In this lesson, you will focus on working with MongoBD and NodeJS. Although this lesson focuses on NodeJS, what you learn here will make it easy to learn how to work with MongoDB generally.
 
## [Setting up MongoDB Atlas](#setting-up-mongoDB-atlas)

Getting started with MongoDB Atlas is easy. Visit the [MongoDB Create Account page](https://account.mongodb.com/account/register) to register your account. You can create a MongoDB account using your Google account or your email. Follow the registration instructions. At some point during the registration process, MongoDB will ask you to choose a path (or plan). Choose the free option. 

In addition, MongoDB will ask for you to choose a cloud provider, region, and other specifications. Choose whichever cloud provider you prefer. Choose M0 Sandbox option. Name your cluster whatever you want. For the remainder of this lesson, we will assume you named your cluster *Project 0*.

At the end of registration, MongoDB will prompt you to create a cluster. Do it. A cluster will be home to your databases. It'll take a few minutes for your cluster to build itself. Do not navigate away from the page yet.

## [Connect IP Address](#connect-ip-address)

Now that you have a MongoDB account and a free-tier cluster, you should configure your MongoDB Atlas settings. First, you should connect your IP address to MongoDB Atlas. You will learn how below.

Each device connected to the internet has an IP address. An IP address is unique for each device. An IP address is used to identify a device on the Internet or a local network, like an address for a house. 

You can only connect to a MongoDB cluster if you are connecting from a device with an IP address that MongoDB Atlas trusts. Add your IP address to the list of trusted IP addresses in your MongoDB account. That way you can connect to your MongoDB account without worry that others can connect without your permission.

Find the IP address for your computer. If your device is connected to a network, it will have a public (external) and private (internal) IP address. The public IP address is the address for the Network. It's how the public will see your address. However, inside the network, your device has its own private IP address.

It's the public IP address that you'll need for MongoDB. To find your public (network) IP address, you can use the website aptly named [What is My IP Address](https://whatismyipaddress.com/).

In case you ever need to know your private IP address, know that multiple ways exist for finding your IP address. The following should help. Find your Network settings. On MacOS, you can go to System Preferences, and inside that find the Network icon. On the Network page, you should see something like `Wi-Fi is connected to name-of-your-wifi and has the IP address XXX.XXX.X.XX.` On Windows, open the start menu and right-click the Network option. Choose the properties option and then choose View Status. Then, choose Details and look for the IP address in the new window.

After finding your public IP address, you should add it to your MongoDB IP access list so that you can connect to your MongoDB cluster. On the homepage for your *Project 0* cluster is your Sandbox. Inside the Sandbox, you will see three buttons. One of those buttons should say Connect. Click it. 

A prompt should open with an option to add a connection IP address. The box might be auto-filled with your public IP address. If it is, double check to make sure it's correct. If not, add your public IP address. 

Be sure to click the button for Add IP Address. You may need to add multiple IP addresses. For instance, if you work on your project from your home and at school, you should add your home IP address and also your school's IP address. If you don't have all the IP addresses now, you can add them later.

In the same prompt that asks for your IP address, MongoDB asks you to create a database user. This is important for managing and accessing your MongoBD Atlas databases. As the prompt says, remember your username and password because you will need it later. After you add the user, click the button in the prompt that says "Choose a connection method".

The next page in the prompt will offer you multiple options for connecting to your MongoDB Atlas cluster. Choose the "connect your application" option. On the following page, choose NodeJS as the driver and the most recent version. Copy the connection string and then click the close button.

## [Connecting to Cluster](#connecting-to-cluster)

Connect your application to the MongoDB cluster you created. You have multiple options for connecting. You can connect using the MongoDB Drivers or the MongoDB Shell. This lesson shows you how to connect using the MongoDB Driver for NodeJS (using the [example from the MongoDB website](https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster/)).

To connect your application to MongoDB, create a project folder. Inside the project folder, add a file named `connect.js`. In the `connect.js` file, add the following code:

```node
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "your connection string";
const client = new MongoClient(url, { useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);
```

We'll discuss the code above down below. In the line that defines the url (i.e., `const url = ...`), be sure to replace the string with the connection string you copied in the previous section when you connected your IP address to your MongoDB account. If you didn't copy that string, go back to the previous section and copy the string. If you try running your code now (entering in the terminal `node connect.js`), you'll get an error that looks something like this:

```node
internal/modules/cjs/loader.js:983
  throw err;
  ^

Error: Cannot find module 'mongodb'
Require stack:
- /Users/jonathangrossman/Documents/Developer/ITC/Work/mongodb/mongo_example/connect.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:980:15)
    at Function.Module._load (internal/modules/cjs/loader.js:862:27)
    at Module.require (internal/modules/cjs/loader.js:1042:19)
    at require (internal/modules/cjs/helpers.js:77:18)
    at Object.<anonymous> (/Users/jonathangrossman/Documents/Developer/ITC/Work/mongodb/mongo_example/connect.js:1:25)
    at Module._compile (internal/modules/cjs/loader.js:1156:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1176:10)
    at Module.load (internal/modules/cjs/loader.js:1000:32)
    at Function.Module._load (internal/modules/cjs/loader.js:899:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/jonathangrossman/Documents/Developer/ITC/Work/mongodb/mongo_example/connect.js'
  ]
}
```

Despite the intimidating look of this error message, the answer to the error is in there. The message includes `Error: Cannot find module 'mongodb'`. This tells you that you need to install the `mongodb` package. If you look in your root folder, you don't have a `node_modules` folder, which means you don't have any packages. 

Add the `mongodb` package to your project by entering the following in your terminal `npm install mongodb`. After entering the installation command, confirm that the message in the terminal says `installation succeeded`. Also, look in your project's root folder to make sure a `node_modules` folder and `package-json.lock` file each exist.

Enter in the terminal `node connect.js`. If you successfully connected your application, the terminal should print `Connected correctly to server.`

Let's discuss the code above. The first line `const { MongoClient } = require("mongodb")`, imports the the `MongoClient()` class into your `connect.js` file. The next line `const url = . . .` defines the connection string for your MongoDB cluster. It's critical for connecting your project folder to your MongoDB account. 

The next line in your code `const client = new MongoClient(url, { useUnifiedTopology: true });` creates an instance of the `MongoClient()` class using the connection string (`url`) as the argument. You need the `{ useUnifiedTopology: true }` to use the new Server Discover and Monitoring engine. The variable `client` is now a MongoClient object customized with the connection string for your MongoDB Atlas cluster.

Following instantiation of the `MongoClient()` class is a block of asynchronous code with `try / catch / finally` blocks nested within. In the `try` block is a line that connects your application to MongoDB Atlas `await client.connect();`. Remember, `client` is your instance of the MongoDB class customized with your MongoDB connection string. That means `.connect()` is a method of the instance of that class. This method does what its name suggests -- it connects your project folder to your MongodDB Atlas cluster.

Inside the `catch` block, you print to the console any errors `console.log(err.stack)`, and then inside the `finally` block, you close the connection between your application and MongoDB Atlas `await client.close();`. Like the `.connect()` method of the `MongoClient()` class instance, the `.close()` method comes from the `client` instance of the `MongoClient()` class.

Although the `.close()` function appears in this basic MongoDB example, you should be thoughtful about how you use it in your application because [connecting to the database is time-consuming and expends resources](https://stackoverflow.com/questions/14495975/why-is-it-recommended-not-to-close-a-mongodb-connection-anywhere-in-node-js-code). Therefore, you shouldn't close a connection if you're just going to have to reconnect again. Instead, consider closing the connection only when your application closes or [not using `.close()` at all](https://stackoverflow.com/questions/52067945/when-to-close-a-mongodb-connection)!

Finally, you run your application `run().catch(console.dir);`.

## [Exploring MongoClient Class](#exploring-mongoclient-class)

The `MongoClient()` class is easy to use. Basically, you need to know that when you create a new instance of the `MongoClient()` class, pass your connection string into the class and save the result to a variable. As a result, that variable will have all the functionality of the `MongoClient()` class. 

Knowing what functionality is available from the `MongoClient()` is important. One place to look is the [MongoDB documentation](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html). 

Another thing you can do is print to the console all the methods of the `MongoClient()` class. Try it. In your `connect.js` file below the last line of code, paste the following code, save your file, and run `node connect.js`.

```node
function getAllFuncs(toCheck) {
  var props = [];
  var obj = toCheck;
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter(function (e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function") return true;
  });
}

console.log(getAllFuncs(client));
```

No need to understand how this block of code works. For now, just know that you have a function called `getAllFuncs` that takes in one argument. Below the function definition, you call the `getAllFuncs` function, pass into it as the argument the `client` instance of the `MongoClient()` class, and print the results to the console.

In the console, you should see all the functions available in the `MongoClient()` class.

```node
[
  '__defineGetter__',     '__defineSetter__',
  '__lookupGetter__',     '__lookupSetter__',
  'addListener',          'close',
  'connect',              'constructor',
  'db',                   'emit',
  'eventNames',           'getLogger',
  'getMaxListeners',      'hasOwnProperty',
  'isConnected',          'isPrototypeOf',
  'listenerCount',        'listeners',
  'logout',               'off',
  'on',                   'once',
  'prependListener',      'prependOnceListener',
  'propertyIsEnumerable', 'rawListeners',
  'removeAllListeners',   'removeListener',
  'setMaxListeners',      'startSession',
  'toLocaleString',       'toString',
  'valueOf',              'watch',
  'withSession'
]
```

In the list of functions above, notice that `connect` and `close` -- the same functions you used in the connect code sample above -- are listed as `MongoClient()` class functions, just like you should expect.

Try two things on your own. First, replace in your code `console.log(getAllFuncs(client));` with `console.log(getAllFuncs(client.connect()));`. Then enter `node connect.js` in your terminal. The console should print the functionality available for the `client.connect()` function.

```node
[
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  'catch',
  'constructor',
  'finally',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'then',
  'toLocaleString',
  'toString',
  'valueOf'
]
```

Second, replace in your code `console.log(getAllFuncs(client.connect()));` with `console.log(getAllFuncs(client.close()));`. Then enter `node connect.js` in your terminal. The console should print the functionality available for the `client.close()` function. It prints the same array as above for `client.connect()`.

You don't need to know how to print the functionality of the `MongoClient()` instance; however, it may help you in the future when working with packages new to you.

## [Adding Data To Database](#adding-data-to-database)

Having completed your setup, you now should create a database and add a document to it. In your `connect.js` file from above, replace the code with the following. 

```node
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                            
const url = "your connection string";
const client = new MongoClient(url, { useUnifiedTopology: true });
 
 // The database to use
 const dbName = "test";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("people");

         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
```

Be sure to change the connection string in `const url = ...` to your connection string like in the section above. Don't yet run your file. First, you should understand the code above.

In the code above, the first three lines are the same as the previous example. You import the `MongoClient()` class definition, you set a variable equal to your connection string, and then you create an instance of the `MongoClient()` class using your connection string as the argument. 

The fourth line, however, is new `const dbName = "test";`. You created a variable named `dbName` and set it equal to a string `"test"`.

Then comes `try / catch / finally` blocks. Those code blocks are similar to the example above but with some additions. First, focus on the `try` block. It now has a line of code that creates a database instance inside your cluster `const db = client.db(dbName);`. 

You define a variable `db` and set it equal to `client.db(dbName)`. The `client` is your instance of the `MongoClient()` class, `.db` is a method of the class (see above for `db` in the list of methods for `MongoClient()`), and you pass into that method the database name you created.

With a database inside your cluster, next you create a collection inside your database `const col = db.collection("people");`. You create a variable named `col` and set it equal to `db.collection("people")`. The `db` is the variable you made above that represents your database named `test`. The `.collection` is a method from the `db` instance, and `"people"` is the name of the collection.

Phew. Now with a collection inside of your database, you can add a document to the collection. First, you write an object with `key:value` pairs and save it to a variable named `personDocument`.

```node
let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }
```

Next is a line that takes the `personDocument` from your code and sends it to MongoDB `const p = await col.insertOne(personDocument);`. The `await` exists because the `insertOne` method for the collection instance returns a promise. 

One way to test whether you successfully added the `personDocument` to the `people` collection in your `test` database is to retrieve that document. That's what the next line of code does `const myDoc = await col.findOne();`. Using the `findOne` method of your collection instance, you retrieve the document and then print it to the console `console.log(myDoc);`.

Ok, test it out. In your terminal, enter `node connect.js`. This time, in addition to printing to the console `Connected correctly to server`, your console should also print the `personDocument`.

```node
{
  _id: 5fa2a070330b7d94c1c69182,
  name: { first: 'Alan', last: 'Turing' },
  birth: 1912-06-22T21:39:20.000Z,
  death: 1954-06-06T22:00:00.000Z,
  contribs: [ 'Turing machine', 'Turing test', 'Turingery' ],
  views: 1250000
}
```

Notice anything different? Although the `personDocument` object that you sent to MongoDB has only 5 `key:value` pairs, the returned document has 6. The additional `key:value` pair is `_id: 5fa2a070330b7d94c1c69182`. MongoDB added an `_id` key!

In the next lesson, you will learn more about adding, reading, updating, and deleting documents from your collections.
