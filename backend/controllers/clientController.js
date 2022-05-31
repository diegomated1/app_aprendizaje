import db from '../database/db.js';


export const getclient = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var clientes = await db.cliente.select({iduser: req.params.iduser});
        }else{
            var clientes = await db.cliente.select({iduser: req.params.iduser, idcliente: req.params.id});
        }
        res.json(clientes);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editclient = async (req, res)=>{
    try{
        await db.cliente.update(req.body.iduser, req.params.id, req.body.options);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deletecliente = async (req, res)=>{
    try{
        await db.cliente.delete(req.params.iduser, req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addcliente = async (req, res)=>{
    try{
        await db.cliente.add(req.body.iduser, req.body.options);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
