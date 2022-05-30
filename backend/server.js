// IMPORTS 
import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

// controladores
import productrouter from './routes/routes.js';

// Midlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes
app.use(productrouter);

// Listen
app.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
});



