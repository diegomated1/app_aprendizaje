
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:3000/user'; 

const LogIn = ()=>{
    const navigate = useNavigate();

    const [user, setuser] = useState('');
    const [hash_u, sethash_u] = useState('');

    const guardar = async (e) =>{
        e.preventDefault();
        var res = await axios.post(`${URI}/login`, {
            user: user,
            hash_u: hash_u
        });
        if([0,1].includes(res.data.res)){
            alert('Credenciales no validas');
        }else{
            localStorage.setItem('iduser', res.data.iduser);
            navigate(`/${res.data.iduser}`);
        }
    };

    return(
        <div className='container'>
            <h3>Iniciar Sesion</h3>
            <form onSubmit={guardar}>
                <input
                    placeholder='cedula/usuario/email'
                    onChange={(e)=> setuser(e.target.value)}
                /><br/>
                <input
                    type='password'
                    placeholder='Password'
                    onChange={(e)=> sethash_u(e.target.value)}
                /><br/>
                <button type="submit" className='btn btn-primary'>Iniciar sesion</button>
            </form>
            <Link to='/signin' className='btn btn-secondary'>Registrarse</Link>
        </div>
    )
}

export default LogIn;