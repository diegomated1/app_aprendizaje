import {usuario} from '../models/models.js';
import bc from 'bcrypt';
import vali from 'validator';

export const getUser = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var usuarios = await usuario.select();
        }else{
            var usuarios = await usuario.select({where: {cedula: req.params.id}});
        }
        res.json(usuarios);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addUser = async (req, res)=>{
    try{
        var data = req.body;
        await usuario.insert(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editUser = async (req, res)=>{
    try{
        await usuario.update(req.body, {cedula: req.params.iduser});
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteUser = async (req, res)=>{
    try{
        await usuario.delete({cedula: req.params.iduser});
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const login = async (req, res)=>{
    try{
        var credencial = req.body.user;
        if(vali.isNumeric(credencial.toString())){
            var user = await usuario.select({where: {cedula: credencial}});
        }else if(vali.isEmail(credencial)){
            var user = await usuario.select({where: {email: credencial}});
        }else{
            var user = await usuario.select({where: {usuario: credencial}});
        }
        
        if(user.length==0){
            res.json({res: 0});
            return
        }

        var resl = await bc.compare(req.body.hash_u, user[0].hash_u);
        if(!resl){
            res.json({res: 1});
        }else{
            res.json({res: 2, iduser: user[0].cedula});
        }
    }catch(err){
        res.json({error: err.message});
    }
};

export const register = async (req, res)=>{
    try{
        var {cedula, email} = req.body;
        var usuario_name = req.body.usuario;

        var user1 = await usuario.select({where: {cedula: cedula}});
        
        if(user1.length>0){
            res.json({res: 0});
            return
        }

        var user2 = await usuario.select({where: {usuario: usuario_name}});
        if(user2.length>0){
            res.json({res: 1});
            return
        }

        var user3 = await usuario.select({where: {email: email}});
        if(user3.length>0){
            res.json({res: 2});
            return
        }
        req.body.hash_u = await bc.hash(req.body.hash_u, 10);
        await usuario.insert(req.body);
        res.json({res: 3});
        
    }catch(err){
        res.json({error: err.message});
    }
};