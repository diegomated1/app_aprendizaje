
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/client'; 

const ShowClients = ()=>{
    const [clients, setclients] = useState([]);
    
    useEffect(()=>{
        getclients();
    }, []);

    const getclients = async () => {
        const res = await axios.get(URI);
        setclients(res.data);
    }

    const deletesellers = async (id) => {
        await axios.delete(`${URI}/${id}`);
        getclients();
    }

    return(
        <div className='container'>
            <Link to='create' className='btn btn-primary'>Añadir</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client)=>(
                        <tr key={client.idcliente}>
                            <td>{client.idcliente}</td>
                            <td>{client.nombre}</td>
                            <td>{client.edad}</td>
                            <td>{client.direccion}</td>
                            <td>{client.telefono}</td>
                            <td>
                                <Link to={`edit/${client.idcliente}`} className="btn btn-info">Edit</Link>
                                <button onClick={()=>deletesellers(client.idcliente)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ShowClients;

