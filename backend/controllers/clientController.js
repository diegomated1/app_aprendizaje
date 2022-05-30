import db from '../database/db.js';


export const getclient = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var clientes = await db.cliente.select({iduser: '1001369364'});
        }else{
            var clientes = await db.cliente.select({iduser: '1001369364', idcliente: req.params.id});
        }
        res.json(clientes);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editclient = async (req, res)=>{
    try{
        await db.cliente.update('1001369364', req.params.id, req.body);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deletecliente = async (req, res)=>{
    try{
        await db.cliente.delete('1001369364', req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addcliente = async (req, res)=>{
    try{
        await db.cliente.add('1001369364', req.body);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
