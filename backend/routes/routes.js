import express from 'express';
const productrouter = express.Router();
const clientrouter = express.Router();
const sellerrouter = express.Router();
const businessrouter = express.Router();
const userrouter = express.Router();

import {getproduct, editproduct, deleteproduct, addproduct} from '../controllers/productsController.js';
import {getclient, editclient, deletecliente, addcliente} from '../controllers/clientController.js';
import {getseller, editseller, deleteseller, addseller} from '../controllers/sellerController.js';
import {getbusiness, editbusiness, deletebusiness, addbusiness} from '../controllers/businessController.js';
import {getuser, edituser, deleteuser, adduser} from '../controllers/userController.js';

//#region productrouter
productrouter.get('/', getproduct);
productrouter.get('/:id', getproduct);
productrouter.post('/', addproduct);
productrouter.put('/:id', editproduct);
productrouter.delete('/:id', deleteproduct);
//#endregion

//#region clientrouter
clientrouter.get('/', getclient);
clientrouter.get('/:id', getclient);
clientrouter.post('/', addcliente);
clientrouter.put('/:id', editclient);
clientrouter.delete('/:id', deletecliente);
//#endregion

//#region sellerrouter
sellerrouter.get('/', getseller);
sellerrouter.get('/:id', getseller);
sellerrouter.post('/', addseller);
sellerrouter.put('/:id', editseller);
sellerrouter.delete('/:id', deleteseller);
//#endregion

//#region businessrouter
businessrouter.get('/', getbusiness);
businessrouter.get('/:id', getbusiness);
businessrouter.post('/', addbusiness);
businessrouter.put('/:id', editbusiness);
businessrouter.delete('/:id', deletebusiness);
//#endregion

//#region userrouter
userrouter.get('/', getuser);
userrouter.get('/:id', getuser);
userrouter.post('/', adduser);
userrouter.put('/:id', edituser);
userrouter.delete('/:id', deleteuser);
//#endregion

export const product_router = productrouter;
export const client_router = clientrouter;
export const seller_router = sellerrouter;
export const business_router = businessrouter;
export const user_router = userrouter;