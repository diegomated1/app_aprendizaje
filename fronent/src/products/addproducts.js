
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const URI = 'http://localhost:3000/product'; 
const URI_emp = 'http://localhost:3000/business'; 

const AddProducts = ()=>{
    const iduser = localStorage.getItem('iduser');
    const navigate = useNavigate();

    const [empresas, setempresas] = useState([]);

    const [nombre, setnombre] = useState('');
    const [valor, setvalor] = useState('');
    const [stock, setstock] = useState('');
    const [idempresa, setidempresa] = useState('');

    useEffect(()=>{
        getempresas();
    }, []);

    const sets = (idempresa)=>{
        setidempresa(idempresa);
        getempresas();
    }

    const getempresas = ()=>{
        axios.get(`${URI_emp}/${iduser}`).then(res=>{
            setempresas(res.data);
        });
    }

    const guardar = async (e) =>{
        e.preventDefault();
        await axios.post(`${URI}/${iduser}`, {
            idempresa: idempresa,
            nombre: nombre,
            valor: valor,
            stock: stock
        });
        navigate(`/${iduser}/products`);
    };

    return(
        <div>
            <Link to={`/${iduser}/products`} className='btn btn-secondary'>Back</Link>
            <h3>Agregar Producto</h3>
            <form onSubmit={guardar}>
                <input
                    placeholder='Nombre'
                    onChange={(e)=> setnombre(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Valor'
                    onChange={(e)=> setvalor(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Stock'
                    onChange={(e)=> setstock(e.target.value)}
                /><br/>
                <input
                    list='empresas'
                    placeholder='Empresa'
                    onChange={(e)=> setidempresa(e.target.value)}
                /><br/>
                <datalist id='empresas'>
                    {
                        empresas.map((empresa)=>(
                            <option key={empresa.idempresa} value={empresa.idempresa} label={empresa.nombreempresa} />
                        ))
                    }
                </datalist>
                <button type="submit" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    )
}

export default AddProducts;

