import db from '../database/db.js';


export const getseller = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var vendedores = await db.vendedor.select({iduser: '1001369364'});
        }else{
            var vendedores = await db.vendedor.select({iduser: '1001369364', idvendedor: req.params.id});
        }
        res.json(vendedores);
    }catch(err){
        res.json({error: err.message});
    }
};

export const editseller = async (req, res)=>{
    try{
        await db.vendedor.update('1001369364', req.params.id, req.body);
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteseller = async (req, res)=>{
    try{
        await db.vendedor.delete('1001369364', req.params.id);
        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const addseller = async (req, res)=>{
    try{
        await db.vendedor.add('1001369364', req.body);
        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};
