import db from '../database/db.js';


export const getuser = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var usuarios = await db.usuario.select({});
        }else{
            var usuarios = await db.usuario.select({cedula: req.params.id});
        }
        res.json(usuarios);
    }catch(err){
        res.json({error: err.message});
    }
};

export const edituser = async (req, res)=>{
    try{
        await db.usuario.update(req.params.id, req.body);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteuser = async (req, res)=>{
    try{
        await db.usuario.delete(req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const adduser = async (req, res)=>{
    try{
        await db.usuario.add(req.body);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
