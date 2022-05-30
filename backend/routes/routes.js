import express from 'express';
const router = express.Router();
import {getproduct, editproduct, deleteproduct, addproduct} from '../controllers/productsController.js';

router.get('/', getproduct);
router.get('/:id', getproduct);
router.post('/', addproduct);
router.put('/:id', editproduct);
router.delete('/:id', deleteproduct);



export default router;