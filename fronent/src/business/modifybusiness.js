
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:3000/business'; 


const ModifyBusiness = ()=>{
    const {id} = useParams();
    const iduser = localStorage.getItem('iduser');
    const navigate = useNavigate();

    const [idempresa, setidempresa] = useState('');
    const [nombreempresa, setnombreempresa] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');

    useEffect(()=>{
        getbusiness();
    }, []);

    const getbusiness = async ()=>{
        var res = (await axios.get(`${URI}/${iduser}/${id}`)).data[0];
        setidempresa(res.idempresa);
        setnombreempresa(res.nombreempresa);
        setdireccion(res.direccion);
        settelefono(res.telefono);
    }

    const update = async (e) =>{
        e.preventDefault();
        await axios.put(`${URI}/${id}`, {
            iduser: iduser,
            options: {
                nombreempresa: nombreempresa,
                direccion: direccion,
                telefono: telefono
            }
        });
        navigate(`/${iduser}/business`);
    };

    return(
        <div>
            <h3>Modificar Empresa #{idempresa}</h3>
            <form onSubmit={update}>
                <input
                    placeholder='Nombre'
                    value={nombreempresa}
                    onChange={(e)=> setnombreempresa(e.target.value)}
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
                <button type="submit" className='btn btn-primary'>Modificar</button>
            </form>
        </div>
    )
}

export default ModifyBusiness;

