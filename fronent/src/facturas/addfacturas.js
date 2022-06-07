
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TableFactura from './tableFactura.js';
import date from 'date-and-time';

const URI = 'http://localhost:3000/factura'; 
const URI_C = 'http://localhost:3000/client'; 
const URI_V = 'http://localhost:3000/seller'; 
const URI_P = 'http://localhost:3000/product'; 

const AddFactura = ()=>{
    const iduser = localStorage.getItem('iduser');
    const navigate = useNavigate();

    // ESTADO DEL BOTON PARA AÑADIR PRODUCTOS

    // ESTADOS QUE ALMACENAN VENDEDORES, CLIENTES, PRODUCTOS DE LA BASE DE DATOS
    const [vendedores, setvendedores] = useState([]);
    const [clientes, setclientes] = useState([]);

    useEffect(()=>{
        getclietes();
        getvendedores();
    }, []);

    const getclietes = ()=>{
        axios.get(`${URI_C}/${iduser}`).then(res=>{
            setclientes(res.data);
        });
    }
    const getvendedores = ()=>{
        axios.get(`${URI_V}/${iduser}`).then(res=>{
            setvendedores(res.data);
        });
    }

    // ESTADOS QUE SE USARAN PARA LOS ATRIBUTOS DE LA FACTURA, PARA GUARDARLA EN LA BASE DE DATOS
    
    const [fe, setfe] = useState('');
    const [idcliente, setidcliente] = useState('');
    const [idvendedor, setidvendedor] = useState('');
    const [valorfactura, setvalorfactura] = useState(0);
    const [descuentofactura, setdescuentofactura] = useState('');

    const [productos, setproductos] = useState([]);

    // GUARDA EN LA BASE DE DATOS LA FACTURA
    const guardar = async (e) =>{
        e.preventDefault();
        const body = {
            factura: {
                iduser: parseInt(iduser),
                fc: date.format(new Date(), 'YYYY-MM-DD'),
                fe: fe,
                idcliente: idcliente,
                idvendedor: idvendedor,
                valorfactura: valorfactura,
                descuentofactura: parseInt(descuentofactura)
            },
            productos: productos
        }
        
        await axios.post(`${URI}/${iduser}`, body);
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
                    type='date'
                    placeholder='Fecha Entrega'
                    onChange={(e)=> setfe(e.target.value)}
                /><br/>

                <input
                    list='clientes'
                    placeholder='Id Cliente'
                    onChange={(e)=> setidcliente(parseInt(e.target.value))}
                /><br/>
                <datalist id='clientes'>
                    {
                        clientes.map((cliente)=>(
                            <option key={cliente.idcliente} value={cliente.idcliente} label={cliente.nombre} />
                        ))
                    }
                </datalist>

                <input
                    list='vendedores'
                    placeholder='Id Vendedor'
                    onChange={(e)=> setidvendedor(parseInt(e.target.value))}
                /><br/>
                <datalist id='vendedores'>
                    {
                        vendedores.map((vendedor)=>(
                            <option key={vendedor.idvendedor} value={vendedor.idvendedor} label={vendedor.nombre} />
                        ))
                    }
                </datalist>

                <input
                    type='number'
                    placeholder='descuentofactura'
                    onChange={(e)=> setdescuentofactura(e.target.value)}
                /><br/>

                <hr></hr>
                
                <TableFactura
                    valorfactura={valorfactura}
                    setvalorfactura={setvalorfactura}
                    productos={productos}
                    setproductos={setproductos}
                />

                <button type="submit" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    )
}

export default AddFactura;

