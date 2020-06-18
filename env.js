const fs = require('fs');

if (fs.existsSync('./public')) {
    process.env.NODE_ENV = 'production';
    process.env.MLAB_PW = "!QAZ2wsx";
    process.env.JWT_KEY = "secret_this_should_be_longer";
    process.env.databaseUri = "mongodb://shift:" + process.env.MLAB_PW + "@ds048279.mlab.com:48279/shifts2020"; // Databse URI and database name
    process.env.databaseName = 'production database: shifts2020'; // Database name
} else {
    process.env.NODE_ENV = 'development';
    process.env.JWT_KEY = "secret_this_should_be_longer";

    process.env.databaseUri = 'mongodb://localhost:27017/shifts2020'; // Databse URI and database name
    process.env.databaseName = 'development database:shifts2020'; // Database name
}