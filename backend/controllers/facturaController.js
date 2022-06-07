import {Cliente, Factura, Producto, Productoxfactura, Vendedor} from '../models/models.js';

export const getFactura = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var data = await Factura.findAll({
                where: {iduser: req.params.iduser},
                include: [{
                    model: Cliente,
                    attributes: ['nombre']
                },{
                    model: Vendedor,
                    attributes: ['nombre']
                }],
                raw: true, nest: true
            });
        }else if(req.params.idproducto===undefined){
            var factura = await Factura.findAll({
                where: {iduser: req.params.iduser, idfactura: req.params.id},
                include: [{
                    model: Cliente,
                    attributes: ['nombre']
                },{
                    model: Vendedor,
                    attributes: ['nombre']
                }],
                raw: true, nest: true
            });
            var productos = await Producto.findAll({
                include: {
                    model: Factura,
                    attributes: [],
                    where: {iduser: req.params.iduser, idfactura: req.params.id},
                    through: { attributes: ['cantproductos']}
                },
                raw: true, nest: true
            });
            var data = (factura.length==0) ? {} : {factura: factura, productos: productos};
        }else{
            var factura = await Factura.findAll({
                where: {iduser: req.params.iduser, idfactura: req.params.id},
                include: [{
                    model: Cliente,
                    attributes: ['nombre']
                },{
                    model: Vendedor,
                    attributes: ['nombre']
                }],
                raw: true, nest: true
            });
            var producto = await Producto.findAll({
                where: {idproducto: req.params.idproducto},
                include: {
                    model: Factura,
                    attributes: [],
                    where: {iduser: req.params.iduser, idfactura: req.params.id},
                    through: {attributes: ['cantproductos']}
                },
                raw: true, nest: true
            });
            var data = (producto.length==0) ? {} : {factura: factura, productos: producto};
        }
        res.json(data);
    }catch(err){
        res.json({error: err.message});
    }
};

export const addFactura = async (req, res)=>{
    try{
        if(req.params.id===undefined){
            var factura = req.body.factura;
            factura.iduser = req.params.iduser;
            var factura_create = await Factura.create(factura);

            req.body.productos.forEach(async (product) => {
                await Productoxfactura.create({
                    iduser: req.params.iduser,
                    cantproductos: product.cantproductos,
                    idproducto: product.idproducto,
                    idfactura: factura_create.idfactura
                });
            });
        }else{
            req.body.productos.forEach(async (product) => {
                var product_c = await Productoxfactura.findAll({
                    where: {
                        idfactura: req.params.id,
                        idproducto: product.idproducto
                    },
                    raw: true, nest: true
                });
                if(product_c.length==0){
                    await Productoxfactura.create({
                        iduser: req.params.iduser,
                        cantproductos: product.cantproductos,
                        idproducto: product.idproducto,
                        idfactura: req.params.id
                    });
                }else{
                    await Productoxfactura.update({
                        cantproductos: product.cantproductos
                    },{
                        where: {
                            idfactura: req.params.id,
                            idproducto: product.idproducto
                        }
                    });
                }
            });
        }

        res.json({message: 'añadido'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const editFactura = async (req, res)=>{
    try{
        await Factura.update(req.body,{
            where: {
                iduser: req.params.iduser,
                idfactura: req.params.id
            }
        })
        res.json({message: 'editado'});
    }catch(err){
        res.json({error: err.message});
    }
};

export const deleteFactura = async (req, res)=>{
    try{
        if(req.params.idproducto===undefined){
            await Productoxfactura.destroy({
                where: {
                    idfactura: req.params.id
                }
            });
            await Factura.destroy({
                where: {
                    idfactura: req.params.id
                }
            });
        }else{
            await Productoxfactura.destroy({
                where: {
                    idfactura: req.params.id,
                    idproducto: req.params.idproducto
                }
            });
        }

        res.json({message: 'eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
};


