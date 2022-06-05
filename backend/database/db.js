import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize('facturacion', 'root', process.env.DBPSS, {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});