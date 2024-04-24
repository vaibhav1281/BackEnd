1. First `Create A Folder` then run the command `npm init -y`  to create a `package.json` file
2. Install express `npm i express` by running this command in your terminal.
- Creating  an express server:
   In your project folder, open terminal or cmd and type the following commands one by one :

   Then you can start creating your server using this code snippet:
    ```jsx
        // This code imports the express module and creates an instance of an express app.
        const express = require('express')
        const app = express();
        
        // It also sets the port number to 3000.
        const port = 3000;
        
        // The app.listen() method starts the server and listens for incoming requests.
        app.listen(port, (req, res) => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    ```
3. Installing nodemon package for automatic restart when there are any changes in the source files:
    - Instiall `npm i nodemon` and make the below changes in your `package.json`
    
    ```jsx
        "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
        },
    ```
    - Now  you can run your server using `npm run dev` to start the server without any issues, but if there are any changes made to the code it will automatically updated.    

4. Now install Mongoose using  npm by running this command: `npm install mongoose`.
5. Now to use `.env` for hiding our sensitive data we need to install `dotenv`: `npm install dotenv`.

# database.js

6. To connect with  your local MongoDB server you will do the bellow  steps :

```javascript
// Import the mongoose library
const mongoose = require("mongoose");

// Load environment variables from.env file
require("dotenv").config();

// Set the database URL from the environment variable
const dbUrl = process.env.DATABASE_URL;

// Define a function to connect to the database
const connectToDataBase = () => {
  // Use mongoose to connect to the database using the URL and options
  mongoose
   .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // If the connection is successful, log a message to the console
   .then(() => console.log("Connected to MongoDB"))

    // If there is an error connecting to the database, log an error message and the error to the console, and exit the process
   .catch((error) => {
      console.log("Error: Failed to connect to MongoDB", error);
      console.error(error);
      process.exit(1);
    });
};

// Export the connectToDataBase function so it can be used in other files
module.exports = connectToDataBase;
```
# How to create Schema In Model.
 We take an example to Todo Schema:

``` javascript
// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for the Todo model
const todoSchema = new mongoose.Schema({
    // Define the title property with type String, required true, and max length 50
    title: {
        type: String,
        required: [true, 'Please add a Title'],
        maxLength: [50, 'Title can not be more than 50 characters']
    },
    // Define the description property with type String, required true, and max length 50
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    // Define the createdAt property with type Date, default value as current date, and required true
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    // Define the updatedAt property with type Date, default value as current date, and required true
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// Export the Todo model using the schema
module.exports = mongoose.model('Todo', todoSchema);
```

#### Below code provides a way for clients to create new todo items in a database using a RESTful API endpoint.

```javascript
// Import the Todo model from the models directory
const Todo = require("../models/todo");

// Define an asynchronous function to create a new todo item
exports.createTodo = async (req, res) => {
  // Use a try-catch block to handle any errors that may occur
  try {
    // Destructure the title and description properties from the request body
    const { title, description } = req.body;

    // Use the Todo model to create a new todo item with the title and description from the request body
    const response = await Todo.create({ title, description });

    // Send a response with a 200 status code, a success message, the created todo item, and a success message
    res.status(200).json({
      success: true,
      data: response,
      message: "Created successfully",
    });
  } catch (err) {
    // If there is an error, log the error to the console and send a response with a 500 status code, a failure message, and the error message
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};
```
#### Now create Routes  for CRUD operations in `routes/todoRoutes.js` file :

```javascript
// Import the express library and create a new router instance
const express = require('express');
const router = express.Router();

// Import the createTodo function from the createTodo controller
const { createTodo } = require('../controllers/createTodo');

// Define a route for POST requests to /createTodo that handles the request using the createTodo function
router.post('/createTodo', createTodo);

// Export the router so it can be used in other files
module.exports = router;
```

### Now to connect to DB and mounting  routes we need to update `index.js`:

```javascript
const express = require('express'); // Importing the express module
const todoRoutes = require('./routes/todoRoutes'); // Importing todo routes from todoRoutes file
const connectToDataBase = require('./config/database'); // Importing database connection from database file

const app = express(); // Creating an instance of express

require("dotenv").config(); // Configuring environment variables
app.use(express.json()); // Enabling JSON parsing middleware

const PORT = process.env.PORT || 1234; // Setting the port number from environment variable or defaulting to 1234

app.use('/api/v1', todoRoutes); // Mounting todo routes at /api/v1 endpoint

app.listen(PORT, () => { // Starting the server
    console.log(`Server is running on port ${PORT}`); // Logging server start message
});

connectToDataBase(); // Connecting to the database

app.get('/', (req,res) => { // Handling GET request at root endpoint
    console.log("Testing of server") // Logging server test message
    res.send(`<h1>testing the server of my app</h1>`); // Sending HTML response
})
```

