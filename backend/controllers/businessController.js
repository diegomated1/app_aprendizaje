import db from '../database/db.js';

export const getbusiness = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var empresas = await db.empresa.select({iduser: req.params.iduser});
        }else{
            var empresas = await db.empresa.select({iduser: req.params.iduser, idempresa: req.params.id});
        }
        res.json(empresas);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editbusiness = async (req, res)=>{
    try{
        await db.empresa.update(req.body.iduser, req.params.id, req.body.options);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deletebusiness = async (req, res)=>{
    try{
        await db.empresa.delete(req.params.iduser, req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addbusiness = async (req, res)=>{
    try{
        await db.empresa.add(req.body.iduser, req.body.options);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
