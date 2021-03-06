
import axios from 'axios';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const URI = 'http://localhost:3000/business'; 

const AddBusiness = ()=>{
    const iduser = localStorage.getItem('iduser');
    const navigate = useNavigate();

    const [idempresa, setidempresa] = useState('');
    const [nombreempresa, setnombreempresa] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');

    const guardar = async (e) =>{
        e.preventDefault();
        await axios.post(`${URI}/${iduser}`, {
            idempresa: idempresa,
            nombreempresa: nombreempresa,
            direccion: direccion,
            telefono: telefono
        });
        navigate(`/${iduser}/business`);
    };

    return(
        <div>
            <Link to={`/${iduser}/business`} className='btn btn-secondary'>Back</Link>
            <h3>Agregar Empresa</h3>
            <form onSubmit={guardar}>
                <input
                    type='number'
                    placeholder='Id Empresa'
                    onChange={(e)=> setidempresa(e.target.value)}
                /><br/>
                <input
                    placeholder='Nombre'
                    onChange={(e)=> setnombreempresa(e.target.value)}
                /><br/>
                <input
                    placeholder='Direccion'
                    onChange={(e)=> setdireccion(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Telefono'
                    onChange={(e)=> settelefono(e.target.value)}
                /><br/>
                <button type="submit" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    )
}

export default AddBusiness;

