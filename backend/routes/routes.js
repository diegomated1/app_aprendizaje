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
import {getuser, edituser, deleteuser, adduser, login} from '../controllers/userController.js';

//#region productrouter
productrouter.get('/:iduser', getproduct);
productrouter.get('/:iduser/:id', getproduct);
productrouter.post('/', addproduct);
productrouter.put('/:id', editproduct);
productrouter.delete('/:iduser/:id', deleteproduct);
//#endregion

//#region clientrouter
clientrouter.get('/:iduser', getclient);
clientrouter.get('/:iduser/:id', getclient);
clientrouter.post('/', addcliente);
clientrouter.put('/:id', editclient);
clientrouter.delete('/:iduser/:id', deletecliente);
//#endregion

//#region sellerrouter
sellerrouter.get('/:iduser', getseller);
sellerrouter.get('/:iduser/:id', getseller);
sellerrouter.post('/', addseller);
sellerrouter.put('/:id', editseller);
sellerrouter.delete('/:iduser/:id', deleteseller);
//#endregion

//#region businessrouter
businessrouter.get('/:iduser', getbusiness);
businessrouter.get('/:iduser/:id', getbusiness);
businessrouter.post('/', addbusiness);
businessrouter.put('/:id', editbusiness);
businessrouter.delete('/:iduser/:id', deletebusiness);
//#endregion

//#region userrouter
userrouter.post('/login', login);
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