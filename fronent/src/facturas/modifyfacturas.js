
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import TableFactura from './tableFactura.js';
import date from 'date-and-time';

const URI = 'http://localhost:3000/factura'; 
const URI_F = 'http://localhost:3000/factura'; 

const ModifyFactura = ()=>{
    const iduser = localStorage.getItem('iduser');
    const {id} = useParams();

    const navigate = useNavigate();
    
    // ESTADOS QUE ALMACENAN VENDEDORES, CLIENTES, PRODUCTOS DE LA BASE DE DATOS
    const [factura, setfactura] = useState();
    const [productos, setproductos] = useState([]);
    const [productos_db, setproductosdb] = useState([]);

    // ESTADOS QUE SE USARAN PARA LOS ATRIBUTOS DE LA FACTURA, PARA GUARDARLA EN LA BASE DE DATOS
    
    const [fe, setfe] = useState('');
    const [valorfactura, setvalorfactura] = useState(0);
    const [descuentofactura, setdescuentofactura] = useState('');

    useEffect(()=>{
        getfactura();
    }, []);

    const getfactura = ()=>{
        axios.get(`${URI_F}/${iduser}/${id}`).then(res=>{
            setfactura(res.data.factura[0]);
            document.getElementById('descuentofactura').value = res.data.factura[0].descuentofactura;
            document.getElementById('date_fe').value = res.data.factura[0].fe.split('T')[0];

            var productos_data = res.data.productos;
            
            productos_data.forEach((producto, index)=>{
                productos_data[index].cantproductos = producto.facturas.productoxfactura.cantproductos;
            })
            
            var total = 0;
            productos_data.forEach(producto=>{
                total += (producto.valor * producto.cantproductos);
            });
            setdescuentofactura(res.data.factura[0].descuentofactura);
            setvalorfactura(total);
            setfe(res.data.factura[0].fe);
            setproductos(productos_data);
            setproductosdb([...productos_data]);
        });
    }

    // GUARDA EN LA BASE DE DATOS LA FACTURA
    const guardar = async (e) =>{
        e.preventDefault();
        const factura_body = {
            fe: fe,
            valorfactura: valorfactura,
            descuentofactura: parseInt(descuentofactura)
        }
        
        await axios.put(`${URI_F}/${iduser}/${factura.idfactura}`, factura_body);
        
        for(let i=0;i<productos_db.length;i++){
            await axios.delete(`${URI_F}/${iduser}/${factura.idfactura}/${productos_db[i].idproducto}`);
        }

        await axios.post(`${URI_F}/${iduser}/${factura.idfactura}`, {productos: productos});
        navigate(`/${iduser}/facturas`);
    };

    return(
        <div className='container card'>
            <Link to={`/${iduser}/facturas`} className='btn btn-secondary'>Back</Link>
            <h3>Agregar Factura</h3>
            <form onSubmit={guardar}>

                <label>Valor Neto</label>
                <div className='card'>
                    <label>0</label>
                </div><br/>

                <label>Valor Total</label>
                <div className='card'>
                    <label>{valorfactura}</label>
                </div><br/>

                <hr></hr>

                <input
                    id='date_fe'
                    type='date'
                    placeholder='Fecha Entrega'
                    onChange={(e)=> setfe(e.target.value)}
                /><br/>

                <input
                    value={2}
                    disabled
                /><br/>

                <input
                    value={2}
                    disabled
                /><br/>

                <input
                    id='descuentofactura'
                    type='number'
                    placeholder='descuentofactura'
                    onChange={(e)=> setdescuentofactura(e.target.value)}
                /><br/>

                <hr></hr>
                
                <TableFactura
                    setvalorfactura={setvalorfactura}
                    productos={productos}
                    setproductos={setproductos}
                />

                <button type="submit" className='btn btn-primary'>Modificar</button>
            </form>
        </div>
    )
}

export default ModifyFactura;

