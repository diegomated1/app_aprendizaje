
import axios from 'axios';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const URI = 'http://localhost:3000/client'; 

const AddClients = ()=>{
    const iduser = localStorage.getItem('iduser');
    const navigate = useNavigate();

    const [idcliente, setidcliente] = useState('');
    const [nombre, setnombre] = useState('');
    const [edad, setedad] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');

    const guardar = async (e) =>{
        e.preventDefault();
        await axios.post(`${URI}/${iduser}`, {
            idcliente: idcliente,
            nombre: nombre,
            edad: edad,
            direccion: direccion,
            telefono: telefono
        });
        navigate(`/${iduser}/clients`);
    };

    return(
        <div>
            <Link to={`/${iduser}/clients`} className='btn btn-secondary'>Back</Link>
            <h3>Agregar Cliente</h3>
            <form onSubmit={guardar}>
                <input
                    type='number'
                    placeholder='Cedula'
                    onChange={(e)=> setidcliente(e.target.value)}
                /><br/>
                <input
                    placeholder='Nombre'
                    onChange={(e)=> setnombre(e.target.value)}
                /><br/>
                <input
                    placeholder='Edad'
                    onChange={(e)=> setedad(e.target.value)}
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

export default AddClients;

