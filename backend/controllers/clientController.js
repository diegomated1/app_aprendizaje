import {Cliente} from '../models/models.js';

export const getClient = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var clientes = await Cliente.findAll({
                where: {
                    iduser: req.params.iduser
                }, raw: true, nest: true});
        }else{
            var clientes = await Cliente.findAll({
                where: {
                    iduser: req.params.iduser,
                    idcliente: req.params.id
                }, raw: true, nest: true});
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
        await Cliente.create(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editClient = async (req, res)=>{
    try{
        await Cliente.update(req.body, {
            where: {
                iduser: req.params.iduser,
                idcliente: req.params.id
            }
        });
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteClient = async (req, res)=>{
    try{
        await Cliente.destroy({
            where: {
                iduser: req.params.iduser,
                idcliente: req.params.id
            }
        });
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


