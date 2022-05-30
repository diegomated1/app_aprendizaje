import db from '../database/db.js';


export const getproduct = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var productos = await db.producto.select({iduser: '1001369364'});
        }else{
            var productos = await db.producto.select({iduser: '1001369364', idproducto: req.params.id});
        }
        res.json(productos);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editproduct = async (req, res)=>{
    try{
        await db.producto.update('1001369364', req.params.id, req.body);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteproduct = async (req, res)=>{
    try{
        await db.producto.delete('1001369364', req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addproduct = async (req, res)=>{
    try{
        await db.producto.add('1001369364', req.body);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
