
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:3000/user'; 

const SignIn = ()=>{
    const navigate = useNavigate();

    const [cedula, setcedula] = useState('');
    const [nombre, setnombre] = useState('');
    const [usuario, setusuario] = useState('');
    const [email, setemail] = useState('');
    const [hash_u, sethash_u] = useState('');

    const guardar = async (e) =>{
        e.preventDefault();
        var res = await axios.post(`${URI}/register`, {
            cedula: cedula,
            nombre: nombre,
            usuario: usuario,
            email: email,
            hash_u: hash_u
        });
        if(res.data.res==0){
            alert('Cedula ya registrada');
            return
        }else if(res.data.res==1){
            alert('Usuario ya registrado');
            return
        }else if(res.data.res==2){
            alert('Email ya registrado');
            return
        }
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
                <button type="submit" className='btn btn-primary'>Registrarse</button>
            </form>
            <Link to='/login' className='btn btn-secondary'>Iniciar Sesion</Link>
        </div>
    )
}

export default SignIn;