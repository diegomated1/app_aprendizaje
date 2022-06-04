import {producto} from '../models/models.js';

export const getProduct = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var productos = await producto.select({where: {iduser: req.params.iduser}});
        }else{
            var productos = await producto.select({where: {iduser: req.params.iduser, idproducto: req.params.id}});
        }
        res.json(productos);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addProduct = async (req, res)=>{
    try{
        var data = req.body;
        data.iduser = req.params.iduser;
        await producto.insert(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editProduct = async (req, res)=>{
    try{
        await producto.update(req.body, {iduser: req.params.iduser, idproducto: req.params.id});
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteProduct = async (req, res)=>{
    try{
        await producto.delete({iduser: req.params.iduser, idproducto: req.params.id});
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


