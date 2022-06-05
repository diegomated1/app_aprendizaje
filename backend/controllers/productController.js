import {Producto} from '../models/models.js';

export const getProduct = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var productos = await Producto.findAll({
                where: {
                    iduser: req.params.iduser
                }, raw: true, nest: true});
        }else{
            var productos = await Producto.findAll({
                where: {
                    iduser: req.params.iduser,
                    idproducto: req.params.id
                }, raw: true, nest: true});
        }
        res.json(productos);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addProduct = async (req, res)=>{
    try{
        var data = req.body;
        data.iduser = req.params.iduser;
        await Producto.create(data);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editProduct = async (req, res)=>{
    try{
        await Producto.update(req.body, {
            where: {
                iduser: req.params.iduser,
                idproducto: req.params.id
            }
        });
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteProduct = async (req, res)=>{
    try{
        await Producto.destroy({
            where: {
                iduser: req.params.iduser,
                idproducto: req.params.id
            }
        });
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


