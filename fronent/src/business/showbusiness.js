
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/business'; 

const ShowBusiness = ()=>{
    const [business, setbusiness] = useState([]);
    
    useEffect(()=>{
        getbusiness();
    }, []);

    const getbusiness = async () => {
        const res = await axios.get(URI);
        setbusiness(res.data);
    }

    const deletebusiness = async (id) => {
        await axios.delete(`${URI}/${id}`);
        getbusiness();
    }

    return(
        <div className='container'>
            <Link to='create' className='btn btn-primary'>Añadir</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {business.map((busines)=>(
                        <tr key={busines.idempresa}>
                            <td>{busines.idempresa}</td>
                            <td>{busines.nombreempresa}</td>
                            <td>{busines.direccion}</td>
                            <td>{busines.telefono}</td>
                            <td>
                                <Link to={`edit/${busines.idempresa}`} className="btn btn-info">Edit</Link>
                                <button onClick={()=>deletebusiness(busines.idempresa)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ShowBusiness;

