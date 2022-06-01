
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const URI = 'http://localhost:3000/seller'; 


const ModifySellers = ()=>{
    const {id} = useParams();
    const iduser = localStorage.getItem('iduser');
    const navigate = useNavigate();

    const [idvendedor, setidvendedor] = useState('');
    const [nombre, setnombre] = useState('');
    const [edad, setedad] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');
    const [sueldo, setsueldo] = useState('');

    useEffect(()=>{
        getsellers();
    }, []);

    const getsellers = async ()=>{
        var res = (await axios.get(`${URI}/${iduser}/${id}`)).data[0];
        setidvendedor(res.idvendedor);
        setnombre(res.nombre);
        setedad(res.edad);
        setdireccion(res.direccion);
        settelefono(res.telefono);
        setsueldo(res.sueldo);
    }

    const update = async (e) =>{
        e.preventDefault();
        await axios.put(`${URI}/${id}`, {
            iduser: iduser,
            options: {
                nombre: nombre,
                edad: edad,
                direccion: direccion,
                telefono: telefono,
                sueldo: sueldo
            }
        });
        navigate(`/${iduser}/sellers`);
    };

    return(
        <div>
            <Link to={`/${iduser}/sellers`} className='btn btn-secondary'>Back</Link>
            <h3>Modificar Vendedor #{idvendedor}</h3>
            <form onSubmit={update}>
                <input
                    placeholder='Nombre'
                    value={nombre}
                    onChange={(e)=> setnombre(e.target.value)}
                /><br/>
                <input
                    placeholder='Edad'
                    value={edad}
                    onChange={(e)=> setedad(e.target.value)}
                /><br/>
                <input
                    placeholder='Direccion'
                    value={direccion}
                    onChange={(e)=> setdireccion(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Telefono'
                    value={telefono}
                    onChange={(e)=> settelefono(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Sueldo'
                    value={sueldo}
                    onChange={(e)=> setsueldo(e.target.value)}
                /><br/>
                <button type="submit" className='btn btn-primary'>Modificar</button>
            </form>
        </div>
    )
}

export default ModifySellers;

