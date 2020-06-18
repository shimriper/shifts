const env = require('./env');
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const dbConfig = require('./database/db'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = process.env.PORT || 3000; // Allows heroku to set port

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const shiftsRoutes = require("./routes/shifts");
const weeksRoutes = require("./routes/weeks");
const sidurRoutes = require("./routes/sidur");
const app = express();


// Database Connection
mongoose.connect(dbConfig.dbProd, {}, (err) => {
    // Check if database was able to connect
    if (err) {
        console.log('Could NOT connect to database: ', err); // Return error message
    } else {
        console.log('Connected to ' + dbConfig.dbProd); // Return success message
    }
});

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.dbProd).then(
//   () => {
//     console.log("Database connected");
//   },
//   (error) => {
//     console.log("Database can't be connected: " + error);
//   }
// );




// Middleware
// app.use(cors({
//     origin: 'http://localhost:4200'
// })); 
// Allows cross origin in development only
app.use(express.static(__dirname + '/public')); // Provide static directory for frontend

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/", express.static(path.join(__dirname + '/public/')));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shifts", shiftsRoutes);
app.use("/api/weeks", weeksRoutes);
app.use("/api/sidur", sidurRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Start Server: Listen on port 8080
app.listen(port, () => {
    console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});

module.exports = app;