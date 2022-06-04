import {vendedor} from '../models/models.js';

export const getSeller = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var vendedores = await vendedor.select({where: {iduser: req.params.iduser}});
        }else{
            var vendedores = await vendedor.select({where: {iduser: req.params.iduser, idvendedor: req.params.id}});
        }
        res.json(vendedores);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addSeller = async (req, res)=>{
    try{
        var data = req.body;
        data.iduser = req.params.iduser;
        await vendedor.insert(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editSeller = async (req, res)=>{
    try{
        await vendedor.update(req.body, {iduser: req.params.iduser, idvendedor: req.params.id});
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteSeller = async (req, res)=>{
    try{
        await vendedor.delete({iduser: req.params.iduser, idvendedor: req.params.id});
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


