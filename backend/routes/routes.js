import express from 'express';
const productrouter = express.Router();
const clientrouter = express.Router();
const sellerrouter = express.Router();
const businessrouter = express.Router();
const userrouter = express.Router();
const facturarouter = express.Router();

import {getProduct, addProduct, editProduct, deleteProduct} from '../controllers/productController.js';
import {getClient, addClient, editClient, deleteClient} from '../controllers/clientController.js';
import {getSeller, addSeller, editSeller, deleteSeller} from '../controllers/sellerController.js';
import {getBusiness, addBusiness, editBusiness, deleteBusiness} from '../controllers/businessController.js';
import {getUser, addUser, editUser, deleteUser, login, register} from '../controllers/userController.js';
//import {getUser, editUser, deleteUser, adduser, login} from '../controllers/userController.js';
//import {getfactura, editfactura, deletefacturas, addfacturas} from '../controllers/facturaController.js';

productrouter.get('/:iduser', getProduct);
productrouter.get('/:iduser/:id', getProduct);
productrouter.post('/:iduser', addProduct);
productrouter.put('/:iduser/:id', editProduct);
productrouter.delete('/:iduser/:id', deleteProduct);

clientrouter.get('/:iduser', getClient);
clientrouter.get('/:iduser/:id', getClient);
clientrouter.post('/:iduser', addClient);
clientrouter.put('/:iduser/:id', editClient);
clientrouter.delete('/:iduser/:id', deleteClient);

sellerrouter.get('/:iduser', getSeller);
sellerrouter.get('/:iduser/:id', getSeller);
sellerrouter.post('/:iduser', addSeller);
sellerrouter.put('/:iduser/:id', editSeller);
sellerrouter.delete('/:iduser/:id', deleteSeller);

businessrouter.get('/:iduser', getBusiness);
businessrouter.get('/:iduser/:id', getBusiness);
businessrouter.post('/:iduser', addBusiness);
businessrouter.put('/:iduser/:id', editBusiness);
businessrouter.delete('/:iduser/:id', deleteBusiness);

userrouter.post('/login', login);
userrouter.post('/register', register);

export const product_router = productrouter;
export const client_router = clientrouter;
export const seller_router = sellerrouter;
export const business_router = businessrouter;
export const user_router = userrouter;
export const factura_router = facturarouter;