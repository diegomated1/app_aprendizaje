import db from '../database/db.js';


export const getproduct = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var productos = await db.producto.select({iduser: req.params.iduser});
        }else{
            var productos = await db.producto.select({iduser: req.params.iduser, idproducto: req.params.id});
        }
        res.json(productos);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editproduct = async (req, res)=>{
    try{
        await db.producto.update(req.body.iduser, req.params.id, req.body.options);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteproduct = async (req, res)=>{
    try{
        await db.producto.delete(req.params.iduser, req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addproduct = async (req, res)=>{
    try{
        await db.producto.add(req.body.iduser, req.body.options);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
