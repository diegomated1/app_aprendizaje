import db from '../database/db.js';
import bcrypt from 'bcrypt';
import vali from 'validator';

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
        var {cedula, nombre, usuario, email, hash_u} = req.body;

        bcrypt.hash(hash_u, 10).then(async(hash)=>{
            await db.usuario.add({cedula: cedula, nombre: nombre, usuario: usuario, email: email, hash_u: hash});
            res.json({message: 'añadido'});
        });

    }catch(err){
        res.json({error: err.message});
    }
};

export const login = async (req, res)=>{
    try{
        var {user, hash_u} = req.body;
        if(vali.isNumeric(user)){
            var usuario = await db.usuario.select({cedula: parseInt(user)});
        }else if(vali.isEmail(user)){
            var usuario = await db.usuario.select({email: user});
        }else{
            var usuario = await db.usuario.select({usuario: user});
        }
        
        if(usuario.length==0){
            res.json({error: 0});
            return
        }

        var hash = usuario[0].hash;

        bcrypt.compare(hash_u, hash, (err, result)=>{
            if(result){
                res.json({error: 1, user: usuario[0]});
            }else{
                res.json({error: 2});
            }
        });

    }catch(err){
        res.json({error: err.message});
    }
}
