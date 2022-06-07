
import axios from 'axios';
import { useState, useEffect} from 'react';

const URI_P = 'http://localhost:3000/product'; 

const TableFactura = (props)=>{
    const iduser = localStorage.getItem('iduser');

    // ESTADO DEL BOTON PARA AÑADIR PRODUCTOS
    const [disabled, setdisabled] = useState(true);

    const [productos_db, setproductos_db] = useState([]);

    useEffect(()=>{
        getproductos();
    }, []);

    const getproductos = ()=>{
        axios.get(`${URI_P}/${iduser}`).then(res=>{
            setproductos_db(res.data);
        });
    }

    const [idproducto, setidproducto] = useState('');
    const [cantproductos, setcantproductos] = useState(1);
    const [nombreproducto, setnombreproducto] = useState('');
    const [valorproducto, setvalorproducto] = useState(0);

    // CAMBIA EL VALOR TOTAL DEL PRODUCTO (CANT * VALOR UNITARIO)
    const setvalor = () =>{
        var nombreproducto = document.getElementById('nombreproducto').innerHTML;

        var cant = document.getElementById('cantproductos').value;
        var valor_u = document.getElementById('precioproducto').innerHTML;
        valor_u = (valor_u==='') ? 0 : parseInt(valor_u);
        cant = (cant==='') ? 0 : parseInt(cant);

        setcantproductos(cant);
        setnombreproducto(nombreproducto);
        setvalorproducto(valor_u);

        document.getElementById('valortotal').innerHTML = valor_u * cant;
    }

    // PONE EL NOMBRE Y EL VALOR UNITARIO AL PONER EL ID DEL PRODUCTO
    const setlabels = (idproducto) =>{
        var encontrado = false;
        setidproducto(idproducto);
        productos_db.forEach(producto=>{
            if(producto.idproducto===parseInt(idproducto)){
                document.getElementById('nombreproducto').innerHTML = producto.nombre;
                document.getElementById('precioproducto').innerHTML = producto.valor;
                
                setvalor();
                setdisabled(false);
                encontrado = true;
                return
            }
        });
        if(!encontrado){
            document.getElementById('nombreproducto').innerHTML = "";
            document.getElementById('precioproducto').innerHTML = "";
            
            setvalor();
            setdisabled(true);
        }
    }

    const editValorfactura = ()=>{
        var total = 0;
        props.productos.forEach(producto=>{
            total += (producto.valor * producto.cantproductos);
        });
        props.setvalorfactura(total);
    }

    const editproduct = (idproducto)=>{
        var indexe = 0;
        props.productos.forEach((producto, index)=>{
            if(producto.idproducto===idproducto){
                setidproducto(producto.idproducto);
                setcantproductos(producto.cantproductos);
                setnombreproducto(producto.nombre);
                setvalorproducto(producto.valor);
                setdisabled(false);
                indexe = index;
                return
            }
        });
        var producto = props.productos;
        producto.splice(indexe, 1);
        props.setproductos([...producto]);
        editValorfactura();
    }

    const addproduct = ()=>{
        setidproducto('');
        setnombreproducto('');
        setvalorproducto(0);
        setcantproductos(0);
        setdisabled(true);

        var producto = props.productos;
        var encontrado = false;

        producto.forEach((product, index)=>{
            if(product.idproducto===idproducto){
                producto[index].cantproductos += cantproductos;
                props.setproductos([...producto]);
                encontrado = true;
                editValorfactura();
            }
        });

        if(encontrado){
            return
        }

        producto.push({
            idproducto: parseInt(idproducto),
            cantproductos: cantproductos,
            nombre: nombreproducto,
            valor: valorproducto
        });
        props.setproductos([...producto]);
        editValorfactura();
    }

    const deleteproduct = (idproducto)=>{
        var indexe = 0;
        props.productos.forEach((producto, index)=>{
            if(producto.idproducto===idproducto){
                indexe = index;
                return
            }
        });
        var producto = props.productos;
        producto.splice(indexe, 1);
        props.setproductos([...producto]);
        editValorfactura();
    }

    return(
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Id Producto</th>
                    <th>Nombre Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cant</th>
                    <th>Valor total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {props.productos.map((producto)=>(
                    <tr key={producto.idproducto}>
                        <th>{producto.idproducto}</th>
                        <th>{producto.nombre}</th>
                        <th>{producto.valor}</th>
                        <th>{producto.cantproductos}</th>
                        <th>{producto.valor * producto.cantproductos}</th>
                        <th>
                            <button type='button' className='btn btn-info' onClick={()=>{editproduct(producto.idproducto)}}>Edit</button>
                            <button type='button' className='btn btn-danger' onClick={()=>{deleteproduct(producto.idproducto)}}>Eliminar</button>
                        </th>
                    </tr>
                ))}
                <tr>
                    <th>
                        <input
                            id='idproducto'
                            list='producto'
                            value={idproducto}
                            onChange={e=>setlabels(e.target.value)}
                        />
                        <datalist id='producto'>
                            {
                                productos_db.map((producto)=>(
                                    <option key={producto.idproducto} value={producto.idproducto} label={producto.nombre} />
                                ))
                            }
                        </datalist>
                    </th>
                    <th
                        id='nombreproducto'
                        style={{fontWeight: 'normal'}}
                    >{nombreproducto}</th>
                    <th
                        id='precioproducto'
                        style={{fontWeight: 'normal'}}
                    >{valorproducto}</th>
                    <th>
                        <input
                            id='cantproductos'
                            value={cantproductos}
                            type='number'
                            style={{width: '100%'}}
                            onChange={setvalor}
                        />
                    </th>
                    <th
                        id='valortotal'
                        style={{fontWeight: 'normal'}}
                    >{cantproductos * valorproducto}</th>
                    <th>
                        <button type='button' id='addproduct' className='btn btn-secondary' disabled={disabled} onClick={addproduct}>Añadir</button>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default TableFactura;

