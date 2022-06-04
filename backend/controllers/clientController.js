import {cliente} from '../models/models.js';

export const getClient = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var clientes = await cliente.select({where: {iduser: req.params.iduser}});
        }else{
            var clientes = await cliente.select({where: {iduser: req.params.iduser, idcliente: req.params.id}});
        }
        res.json(clientes);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addClient = async (req, res)=>{
    try{
        var data = req.body;
        data.iduser = req.params.iduser;
        await cliente.insert(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editClient = async (req, res)=>{
    try{
        await cliente.update(req.body, {iduser: req.params.iduser, idcliente: req.params.id});
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteClient = async (req, res)=>{
    try{
        await cliente.delete({iduser: req.params.iduser, idcliente: req.params.id});
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


