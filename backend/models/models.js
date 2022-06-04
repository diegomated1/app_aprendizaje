import db from '../database/db.js';

export const usuario = db.ADD.TABLE('usuario', {nombre: 'cedula', tipo: 'int'},{
    nombre: 'varchar(30)',
    usuario: 'varchar(30)',
    email: 'varchar(50)',
    hash_u: 'varchar(120)'
});

export const cliente = db.ADD.TABLE('cliente', {nombre: 'idcliente', tipo: 'int'},{
    iduser: 'int',
    nombre: 'varchar(60)',
    edad: 'int',
    direccion: 'varchar(100)',
    telefono: 'int'
});

export const vendedor = db.ADD.TABLE('vendedor', {nombre: 'idvendedor', tipo: 'int'},{
    iduser: 'int',
    nombre: 'varchar(30)',
    edad: 'int',
    direccion: 'varchar(100)',
    telefono: 'int',
    sueldo: 'int'
});

export const empresa = db.ADD.TABLE('empresa', {nombre: 'idempresa', tipo: 'int'},{
    iduser: 'int',
    nombreempresa: 'varchar(30)',
    direccion: 'varchar(50)',
    telefono: 'float'
});

export const producto = db.ADD.TABLE('producto', {nombre: 'idproducto', tipo: 'int'},{
    iduser: 'int',
    nombre: 'varchar(30)',
    valor: 'int',
    stock: 'int',
    idempresa: 'int'
});

export const factura = db.ADD.TABLE('factura', {nombre: 'idfactura', tipo: 'int'},{
    iduser: 'int',
    fc: 'datetime',
    fe: 'datetime',
    idcliente: 'int',
    idvendedor: 'int',
    valorfactura: 'int',
    descuentofactura: 'int'
});

export const productoxfactura = db.ADD.TABLE('productoxfactura', {nombre: 'idpf', tipo: 'int'},{
    iduser: 'int',
    idproducto: 'int',
    idfactura: 'int',
    cantproductos: 'int'
});