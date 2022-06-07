
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/factura'; 

const ShowFacturas = ()=>{
    const [facturas, setfacturas] = useState([]);
    const iduser = localStorage.getItem('iduser');

    useEffect(()=>{
        getfacturas();
    }, []);

    const getfacturas = async () => {
        const res = await axios.get(`${URI}/${iduser}`);
        setfacturas(res.data);
    }

    const deletefacturas = async (id) => {
        await axios.delete(`${URI}/${iduser}/${id}`);
        getfacturas();
    }

    return(
        <div className='container'>
            <Link to={`/${iduser}`} className='btn btn-primary'>Menu</Link>
            <Link to='create' className='btn btn-primary'>Añadir</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fc</th>
                        <th>Fe</th>
                        <th>Id Cliente</th>
                        <th>Id Vendedor</th>
                        <th>Valor Factura</th>
                        <th>Descuento Factura</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map((factura)=>(
                        <tr key={factura.idfactura}>
                            <td>{factura.idfactura}</td>
                            <td>{factura.fc.split('T')[0]}</td>
                            <td>{factura.fe.split('T')[0]}</td>
                            <td>{factura.idcliente}</td>
                            <td>{factura.idvendedor}</td>
                            <td>{factura.valorfactura}</td>
                            <td>{factura.descuentofactura}</td>
                            <td>
                                <Link to={`edit/${factura.idfactura}`} className="btn btn-info">Edit</Link>
                                <button onClick={()=>deletefacturas(factura.idfactura)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ShowFacturas;

