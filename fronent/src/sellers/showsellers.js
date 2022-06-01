
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/seller'; 

const ShowSellers = ()=>{
    const [sellers, setsellers] = useState([]);
    const iduser = localStorage.getItem('iduser');

    useEffect(()=>{
        getsellers();
    }, []);

    const getsellers = async () => {
        const res = await axios.get(`${URI}/${iduser}`);
        setsellers(res.data);
    }

    const deletesellers = async (id) => {
        await axios.delete(`${URI}/${iduser}/${id}`);
        getsellers();
    }

    return(
        <div className='container'>
            <Link to={`/${iduser}`} className='btn btn-primary'>Menu</Link>
            <Link to='create' className='btn btn-primary'>Añadir</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Sueldo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller)=>(
                        <tr key={seller.idvendedor}>
                            <td>{seller.idvendedor}</td>
                            <td>{seller.nombre}</td>
                            <td>{seller.edad}</td>
                            <td>{seller.direccion}</td>
                            <td>{seller.telefono}</td>
                            <td>{seller.sueldo}</td>
                            <td>
                                <Link to={`edit/${seller.idvendedor}`} className="btn btn-info">Edit</Link>
                                <button onClick={()=>deletesellers(seller.idvendedor)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ShowSellers;

