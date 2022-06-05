import {Empresa} from '../models/models.js';

export const getBusiness = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var empresas = await Empresa.findAll({
                where: {
                    iduser: req.params.iduser
                }, raw: true, nest: true});
        }else{
            var empresas = await Empresa.findAll({
                where: {
                    iduser: req.params.iduser,
                    idempresa: req.params.id
                }, raw: true, nest: true});
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
        await Empresa.create(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editBusiness = async (req, res)=>{
    try{
        await Empresa.update(req.body, {
            where: {
                iduser: req.params.iduser,
                idempresa: req.params.id
            }
        });
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteBusiness = async (req, res)=>{
    try{
        await Empresa.destroy({
            where: {
                iduser: req.params.iduser,
                idempresa: req.params.id
            }
        });
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


