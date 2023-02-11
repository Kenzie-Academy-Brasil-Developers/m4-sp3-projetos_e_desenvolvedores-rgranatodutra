import { Client } from "pg";
import "dotenv/config";

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT
} = process.env; 

export const client: Client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: parseInt(DB_PORT!)
});