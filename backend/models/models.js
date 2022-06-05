import { sequelize } from '../database/db.js';
import { DataTypes } from 'sequelize';

export const Usuario = sequelize.define('usuario',{
    cedula: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    usuario: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_u: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

export const Cliente = sequelize.define('cliente',{
    iduser: DataTypes.INTEGER,
    idcliente: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
}, {
    freezeTableName: true,
    timestamps: false
});

export const Vendedor = sequelize.define('vendedor',{
    iduser: DataTypes.INTEGER,
    idvendedor: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    sueldo: DataTypes.INTEGER,
}, {
    freezeTableName: true,
    timestamps: false
});

export const Empresa = sequelize.define('empresa',{
    iduser: DataTypes.INTEGER,
    idempresa: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombreempresa: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

export const Factura = sequelize.define('factura',{
    iduser: DataTypes.INTEGER,
    idfactura: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fc: DataTypes.DATE,
    fe: DataTypes.DATE,
    idcliente: DataTypes.INTEGER,
    idvendedor: DataTypes.INTEGER,
    valorfactura: DataTypes.INTEGER,
    descuentofactura: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

export const Producto = sequelize.define('producto',{
    iduser: DataTypes.INTEGER,
    idproducto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    idempresa: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

export const Productoxfactura = sequelize.define('productoxfactura',{
    iduser: DataTypes.INTEGER,
    idpf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantproductos: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

Usuario.hasMany(Cliente, {foreignKey: "iduser"});
Usuario.hasMany(Vendedor, {foreignKey: "iduser"});
Usuario.hasMany(Empresa, {foreignKey: "iduser"});
Usuario.hasMany(Producto, {foreignKey: "iduser"});
Usuario.hasMany(Factura, {foreignKey: "iduser"});
Usuario.hasMany(Productoxfactura, {foreignKey: "iduser"});

Empresa.hasMany(Producto, {foreignKey: "idproducto"});

Cliente.hasMany(Factura, {foreignKey: "idcliente"});
Vendedor.hasMany(Factura, {foreignKey: "idvendedor"});

Factura.belongsToMany(Producto, {
    through: Productoxfactura,
    foreignKey: "idfactura"
});

Producto.belongsToMany(Factura, {
    through: Productoxfactura,
    foreignKey: "idproducto"
});

