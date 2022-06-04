// IMPORTS 
import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';

// controladores
import {client_router, business_router, seller_router, product_router, user_router, factura_router} from './routes/routes.js';

// Midlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/user', user_router);
app.use('/seller', seller_router);
app.use('/business', business_router);
app.use('/product', product_router);
app.use('/client', client_router);
app.use('/factura', factura_router);

// Listen
app.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
});



