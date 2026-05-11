import { Client } from 'pg';
import dbConfig from '../config/database.config.js';
import dbProduct from '../models/product.model.js';
import dbUser from '../models/user.model.js';

import Sequelize from 'sequelize';


console.log(process.env.DB_PASSWORD);
console.log(typeof process.env.DB_PASSWORD);

const client = new Client({
    user:dbConfig.USER,
    host:dbConfig.HOST,
    database:"postgres",
    password:dbConfig.PASSWORD,
    port: dbConfig.PORT,
})

async function createDatabase(dbName) {
    try {
     await client.connect();
     
     const query = `CREATE DATABASE ${dbName}`;
     await client.query(query);

     console.log(`Database "${dbName} created successfully`);
    } catch (error) {
        if (error.code === '42P04') {
            console.error(`Database "${dbName}" already exists.`);
        }
    } 
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    pool: {
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}); 

createDatabase(dbConfig.DB);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = dbProduct(sequelize,Sequelize);
db.users = dbUser(sequelize,Sequelize);


export default db;
