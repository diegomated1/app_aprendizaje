import {empresa} from '../models/models.js';

export const getBusiness = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var empresas = await empresa.select({where: {iduser: req.params.iduser}});
        }else{
            var empresas = await empresa.select({where: {iduser: req.params.iduser, idempresa: req.params.id}});
        }
        res.json(empresas);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addBusiness = async (req, res)=>{
    try{
        var data = req.body;
        data.iduser = req.params.iduser;
        await empresa.insert(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editBusiness = async (req, res)=>{
    try{
        await empresa.update(req.body, {iduser: req.params.iduser, idempresa: req.params.id});
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteBusiness = async (req, res)=>{
    try{
        await empresa.delete({iduser: req.params.iduser, idempresa: req.params.id});
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


