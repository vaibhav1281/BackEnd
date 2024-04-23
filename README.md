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
// Import the Mongoose library
const mongoose = require('mongoose' );

// Set the MONGODB_URI constant to the value of the MONGODB_URI environment variable
const MONGODB_URI = process.env.MONGODB_URI

// Load environment variables from a.env file
require('dotenv').config();

// Define a function connectToDataBase that connects to the MongoDB database using the Mongoose library
const connectToDataBase = () => {

    // Connect to the MongoDB database using the Mongoose library and the MONGODB_URI connection string
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // Log a success message to the console if the connection to the database is successful
   .then(() => console.log('Connected to MongoDB'))

    // Log an error message to the console if there's an error connecting to the database
   .catch((error) => {
        console.log("Error: Failed to connect to MongoDB", error)
        console.error(error);
        process.exit(1)
    });
}

// Export the connectToDataBase function so it can be used in other parts of the application
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
        maxLength: 50
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
const Todo = require('../models/todo');

// Export the createTodo function, which will handle creating a new todo item
exports.createTodo = async (req, res) => {
  // Use a try block to attempt to create a new todo item
  try {
    // Destructure the title and discription properties from the request body
    const { title, discription } = req.body;

    // Use the Todo model to create a new todo item with the provided title and discription
    const response = await Todo.create({ title, discription });

    // If the todo item is created successfully, return a 200 status code and a success message
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully"
    });
  }
  // Use a catch block to handle any errors that occur during the creation of the todo item
  catch (error) {
    // Log the error to the console for debugging purposes
    console.error(error);
    console.log(error);

    // Return a 500 status code and an error message
    res.status(500).json({
      success: false,
      data: 'internal server error',
      message: error.message,
    });
  }
};
```
