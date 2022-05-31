
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:3000/user'; 

const SignIn = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();

    const [cedula, setcedula] = useState('');
    const [nombre, setnombre] = useState('');
    const [usuario, setusuario] = useState('');
    const [email, setemail] = useState('');
    const [hash_u, sethash_u] = useState('');

    const guardar = async (e) =>{
        e.preventDefault();
        await axios.post(URI, {
            cedula: cedula,
            nombre: nombre,
            usuario: usuario,
            email: email,
            hash_u: hash_u
        });
        localStorage.setItem('iduser', cedula);
        navigate(`/${cedula}`);
    };

    return(
        <div className='container'>
            <h3>Registrarse</h3>
            <form onSubmit={guardar}>
                <input
                    type='number'
                    placeholder='Cedula'
                    onChange={(e)=> setcedula(e.target.value)}
                /><br/>
                <input
                    placeholder='Nombre'
                    onChange={(e)=> setnombre(e.target.value)}
                /><br/>
                <input
                    placeholder='Usuario'
                    onChange={(e)=> setusuario(e.target.value)}
                /><br/>
                <input
                    placeholder='Email'
                    onChange={(e)=> setemail(e.target.value)}
                /><br/>
                <input
                    type='password'
                    placeholder='Password'
                    onChange={(e)=> sethash_u(e.target.value)}
                /><br/>
                <button type="submit" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    )
}

export default SignIn;