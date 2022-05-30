import db from '../database/db.js';


export const getbusiness = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var empresas = await db.empresa.select({iduser: '1001369364'});
        }else{
            var empresas = await db.empresa.select({iduser: '1001369364', idempresa: req.params.id});
        }
        res.json(empresas);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editbusiness = async (req, res)=>{
    try{
        await db.empresa.update('1001369364', req.params.id, req.body);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deletebusiness = async (req, res)=>{
    try{
        await db.empresa.delete('1001369364', req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addbusiness = async (req, res)=>{
    try{
        await db.empresa.add('1001369364', req.body);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
