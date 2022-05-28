import mysql from 'mysql2';
import vali from 'validator';
import dotenv from 'dotenv';
dotenv.config();

class db{

    #pool = null;

    #createpool = ()=>{
        return mysql.createPool({
            host: 'localhost',
            database: 'facturacion',
            user: 'root',
            password: process.env.DBPSS
        });
    }

    #select = (options, table, columns)=>{
        var sql =  `SELECT ${columns} FROM ${table} `;
        var keys = Object.keys(options);

        keys.forEach(e=>{
            if(typeof options[e]==='number'){
                sql += `${(e==keys[0]) ? `WHERE ${e} = ${options[e]} ` : `AND ${e} = ${options[e]} `}`
            }else{
                sql += `${(e==keys[0]) ? `WHERE ${e} = '${options[e]}' ` : `AND ${e} = '${options[e]}' `}`
            }
            
        });
        return sql;
    }

    #update = (options, table)=>{
        var sql = `UPDATE ${table} SET `;
        var keys = Object.keys(options);

        keys.forEach(e=>{
            sql += `${(typeof options[e]==='number') ? `${e} = ${options[e]}` : ` ${e} = '${options[e]}'`}, `
        });
        sql = sql.slice(0, sql.length-2);
        return sql;
    }

    constructor(){

        this.#pool = this.#createpool();

        this.usuario = {
            select: (options = {
                cedula: null,
                nombre: null,
                usuario: null,
                email: null,
                hash_u: null})=>{
                return new Promise((res,rej)=>{

                    var sql = this.#select(options, 'usuario', 'cedula, nombre, usuario, email, hash_u as hash')
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            add: (cedula, nombre, usuario, email, hash_u)=>{
                return new Promise((res,rej)=>{
                    var sql = `INSERT INTO usuario(cedula, nombre, usuario, email, hash_u)
                                values (${cedula}, '${nombre}', '${usuario}', '${email}', '${hash_u}')`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                }) 
            },

            update: (cedula, options = {
                nombre: null,
                usuario: null,
                email: null,
                hash_u: null})=>{
                return new Promise((res,rej)=>{
                    var sql = this.#update(options, 'usuario');
                    sql += ` WHERE cedula=${cedula}`;
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            delete: (cedula)=>{
                return new Promise((res, rej)=>{
        
                    var sql = `DELETE FROM usuario
                    WHERE cedula = ${cedula}`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            }
        }

        this.cliente = {
            select: (options = {
                iduser: null,
                idcliente: null,
                nombre: null,
                edad: null,
                direccion: null,
                telefono: null})=>{
                return new Promise((res,rej)=>{

                    var sql = this.#select(options, 'cliente', 'iduser, idcliente, nombre, edad, direccion, telefono')
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            add: (iduser, idcliente, nombre, edad, direccion, telefono)=>{
                return new Promise((res,rej)=>{
                    var sql = `INSERT INTO cliente(iduser, idcliente, nombre, edad, direccion, telefono)
                                values (${iduser}, ${idcliente}, '${nombre}', ${edad}, '${direccion}', ${telefono})`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                }) 
            },

            update: (iduser, idcliente, options = {
                nombre: null,
                edad: null,
                direccion: null,
                telefono: null})=>{
                return new Promise((res,rej)=>{
                    var sql = this.#update(options, 'cliente');
                    sql += ` WHERE iduser=${iduser} AND idcliente=${idcliente}`;
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            delete: (iduser, idcliente)=>{
                return new Promise((res, rej)=>{
        
                    var sql = `DELETE FROM cliente
                    WHERE idcliente = ${idcliente} AND iduser = ${iduser}`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            }
        }

        this.empresa = {
            select: (options = {
                iduser: null,
                idempresa: null,
                nombreempresa: null,
                direccion: null,
                telefono: null})=>{
                return new Promise((res,rej)=>{
                    var sql = this.#select(options, 'empresa', 'iduser, idempresa, nombreempresa, direccion, telefono')
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            add: (iduser, idempresa, nombreempresa, direccion, telefono)=>{
                return new Promise((res,rej)=>{
                    var sql = `INSERT INTO empresa(iduser, idempresa, nombreempresa, direccion, telefono)
                                values (${iduser}, ${idempresa}, '${nombreempresa}', '${direccion}', ${telefono})`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                }) 
            },

            update: (iduser, idempresa, options = {
                nombreempresa: null,
                direccion: null,
                telefono: null})=>{
                return new Promise((res,rej)=>{
                    var sql = 'UPDATE empresa SET ';
                    var keys = Object.keys(options);

                    keys.forEach(e=>{
                        sql += `${(typeof options[e]==='number') ? `${e} = ${options[e]}` : ` ${e} = '${options[e]}'`}, `
                    });
                    sql = sql.slice(0, sql.length-2);
                    sql += ` WHERE iduser=${iduser} AND idempresa=${idempresa}`;
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            delete: (iduser, idempresa)=>{
                return new Promise((res, rej)=>{
        
                    var sql = `DELETE FROM empresa
                    WHERE idempresa = ${idempresa} AND iduser = ${iduser}`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            }
        }

        this.producto = {
            select: (options = {
                iduser: null,
                idproducto: null,
                idempresa: null,
                nombre: null,
                valor: null,
                stock: null})=>{
                return new Promise((res,rej)=>{
                    var sql = this.#select(options, 'producto', 'iduser, idproducto, idempresa, nombre, valor, stock');
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            add: (iduser, idempresa, nombre, valor, stock)=>{
                return new Promise((res,rej)=>{
                    var sql = `INSERT INTO producto(iduser, idempresa, nombre, valor, stock)
                                values (${iduser}, ${idempresa}, '${nombre}', ${valor}, ${stock})`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                }) 
            },

            update: (iduser, idproducto, options = {
                nombre: null,
                valor: null,
                stock: null})=>{
                return new Promise((res,rej)=>{
                    var sql = 'UPDATE producto SET ';
                    var keys = Object.keys(options);

                    keys.forEach(e=>{
                        sql += `${(typeof options[e]==='number') ? `${e} = ${options[e]}` : ` ${e} = '${options[e]}'`}, `
                    });
                    sql = sql.slice(0, sql.length-2);
                    sql += ` WHERE iduser=${iduser} AND idproducto=${idproducto}`;
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            delete: (iduser, idproducto)=>{
                return new Promise((res, rej)=>{
        
                    var sql = `DELETE FROM producto
                    WHERE idproducto = ${idproducto} AND iduser = ${iduser}`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            }
        }

        this.factura = {
            select: (options = {
                iduser: null,
                idfactura: null,
                fc: null,
                fe: null,
                idcliente: null,
                idvendedor: null,
                valorfactura: null,
                descuentofactura: null})=>{
                return new Promise((res,rej)=>{
                    var sql = this.#select(options, 'factura', 'iduser, idfactura, fc, fe, idcliente, idvendedor, valorfactura, descuentofactura');
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            add: (iduser, fe, idcliente, idvendedor, valorfactura, descuentofactura)=>{
                return new Promise((res,rej)=>{
                    var sql = `INSERT INTO producto(iduser, fc, fe, idcliente, idvendedor, valorfactura, descuentofactura)
                                values (${iduser}, now(), '${fe}', ${idcliente}, ${idvendedor}, ${valorfactura}, ${descuentofactura})`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                }) 
            },

            update: (iduser, idfactura, options = {
                fe: null,
                valorfactura: null,
                descuentofactura: null})=>{
                return new Promise((res,rej)=>{
                    var sql = 'UPDATE factura SET ';
                    var keys = Object.keys(options);

                    keys.forEach(e=>{
                        sql += `${(typeof options[e]==='number') ? `${e} = ${options[e]}` : ` ${e} = '${options[e]}'`}, `
                    });
                    sql = sql.slice(0, sql.length-2);
                    sql += ` WHERE iduser=${iduser} AND idfactura=${idfactura}`;
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            delete: (iduser, idfactura)=>{
                return new Promise((res, rej)=>{
        
                    var sql = `DELETE FROM factura
                    WHERE idfactura = ${idfactura} AND iduser = ${iduser}`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            }
        }

        this.vendedor = {
            select: (options = {
                iduser: null,
                idvendedor: null,
                nombre: null,
                edad: null,
                direccion: null,
                telefono: null,
                sueldo: null})=>{
                return new Promise((res,rej)=>{

                    var sql = this.#select(options, 'vendedor', 'iduser, idvendedor, nombre, edad, direccion, telefono, sueldo')
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            add: (iduser, idvendedor, nombre, edad, direccion, telefono, sueldo)=>{
                return new Promise((res,rej)=>{
                    var sql = `INSERT INTO vendedor(iduser, idvendedor, nombre, edad, direccion, telefono, sueldo)
                                values (${iduser}, ${idvendedor}, '${nombre}', ${edad}, '${direccion}', ${telefono}, ${sueldo})`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                }) 
            },

            update: (iduser, idvendedor, options = {
                nombre: null,
                edad: null,
                direccion: null,
                telefono: null,
                sueldo: null})=>{
                return new Promise((res,rej)=>{
                    var sql = this.#update(options, 'vendedor');
                    sql += ` WHERE iduser=${iduser} AND idvendedor=${idvendedor}`;
                    
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            },

            delete: (iduser, idvendedor)=>{
                return new Promise((res, rej)=>{
        
                    var sql = `DELETE FROM vendedor
                    WHERE idvendedor = ${idvendedor} AND iduser = ${iduser}`;
        
                    this.#pool.execute(sql, (err, data)=>{
                        if(err) rej(err);
                        res(data);
                    });
                });
            }
        }
    }

}


export default new db(); 

