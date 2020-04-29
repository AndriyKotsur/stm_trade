require('dotenv').config();

module.exports = {
    database: process.env.DATABASE_NAME,
    databaseUrl: process.env.MONGODB_URL,
    mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
    port: process.env.PORT
}