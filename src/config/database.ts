// Get the client
import mysql from 'mysql2/promise';
import 'dotenv/config'
// Create the connection to database

const getConnection = async () => {
    const connection = await mysql.createConnection({
        port: 3306,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    return connection;

}

export default getConnection;
