import {Vendedor} from '../models/models.js';

export const getSeller = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var vendedores = await Vendedor.findAll({
                where: {
                    iduser: req.params.iduser
                }, raw: true, nest: true});
        }else{
            var vendedores = await Vendedor.findAll({
                where: {
                    iduser: req.params.iduser,
                    idvendedor: req.params.id
                }, raw: true, nest: true});
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
        await Vendedor.create(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editSeller = async (req, res)=>{
    try{
        await Vendedor.update(req.body, {
            where: {
                iduser: req.params.iduser,
                idvendedor: req.params.id
            }
        });
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteSeller = async (req, res)=>{
    try{
        await Vendedor.destroy({
            where: {
                iduser: req.params.iduser,
                idvendedor: req.params.id
            }
        });
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


