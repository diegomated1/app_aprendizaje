import db from '../database/db.js';


export const getseller = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var vendedores = await db.vendedor.select({iduser: req.params.iduser});
        }else{
            var vendedores = await db.vendedor.select({iduser: req.params.iduser, idvendedor: req.params.id});
        }
        res.json(vendedores);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editseller = async (req, res)=>{
    try{
        await db.vendedor.update(req.body.iduser, req.params.id, req.body.options);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteseller = async (req, res)=>{
    try{
        await db.vendedor.delete(req.params.iduser, req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addseller = async (req, res)=>{
    try{
        await db.vendedor.add(req.body.iduser, req.body.options);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
