import {Usuario} from '../models/models.js';
import bc from 'bcrypt';
import vali from 'validator';

export const login = async (req, res)=>{
    try{
        var credencial = req.body.user;
        if(vali.isNumeric(credencial.toString())){
            var user = await Usuario.findAll({
                where: {
                    cedula: parseInt(credencial)
                },
                raw: true, nest: true
            });
        }else if(vali.isEmail(credencial)){
            var user = await Usuario.findAll({
                where: {
                    email: credencial
                },
                raw: true, nest: true
            });
        }else{
            var user = await Usuario.findAll({
                where: {
                    usuario: credencial
                },
                raw: true, nest: true
            });
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

        var user1 = await Usuario.findAll({
            where: {
                cedula: cedula
            },
            raw: true, nest: true
        });
        if(user1.length>0){
            res.json({res: 0});
            return
        }

        var user2 = await Usuario.findAll({
            where: {
                usuario: usuario_name
            },
            raw: true, nest: true
        });
        if(user2.length>0){
            res.json({res: 1});
            return
        }

        var user3 = await Usuario.findAll({
            where: {
                email: email
            },
            raw: true, nest: true
        });
        if(user3.length>0){
            res.json({res: 2});
            return
        }
        req.body.hash_u = await bc.hash(req.body.hash_u, 10);
        await Usuario.create(req.body);
        res.json({res: 3});
        
    }catch(err){
        res.json({error: err.message});
    }
};