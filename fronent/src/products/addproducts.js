
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:3000/product'; 

const AddProducts = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();

    const [nombre, setnombre] = useState('');
    const [valor, setvalor] = useState('');
    const [stock, setstock] = useState('');
    const [idempresa, setidempresa] = useState('');

    const guardar = async (e) =>{
        e.preventDefault();
        await axios.post(URI, {
            idempresa: idempresa,
            nombre: nombre,
            valor: valor,
            stock: stock
        });
        navigate('/products');
    };

    return(
        <div>
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
                    type='number'
                    placeholder='Id Empresa'
                    onChange={(e)=> setidempresa(e.target.value)}
                /><br/>
                <button type="submit" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    )
}

export default AddProducts;

