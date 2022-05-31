
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:3000/product'; 


const ModifyProducts = ()=>{
    const iduser = localStorage.getItem('iduser');
    const {id} = useParams();
    const navigate = useNavigate();

    const [idproducto, setidproducto] = useState('');
    const [nombre, setnombre] = useState('');
    const [valor, setvalor] = useState('');
    const [stock, setstock] = useState('');

    useEffect(()=>{
        getproduct();
    }, []);

    const getproduct = async ()=>{
        var res = (await axios.get(`${URI}/${iduser}/${id}`)).data[0];
        setidproducto(res.idproducto);
        setnombre(res.nombre);
        setvalor(res.valor);
        setstock(res.stock);
    }

    const update = async (e) =>{
        e.preventDefault();
        await axios.put(`${URI}/${id}`, {
            iduser: iduser
            ,options: {
                nombre: nombre,
                valor: valor,
                stock: stock
            }
            });
        navigate(`/${iduser}/products`);
    };

    return(
        <div>
            <h3>Modificar {idproducto}</h3>
            <form onSubmit={update}>
                <input
                    placeholder='Nombre'
                    value={nombre}
                    onChange={(e)=> setnombre(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Valor'
                    value={valor}
                    onChange={(e)=> setvalor(e.target.value)}
                /><br/>
                <input
                    type='number'
                    placeholder='Stock'
                    value={stock}
                    onChange={(e)=> setstock(e.target.value)}
                /><br/>
                <button type="submit" className='btn btn-primary'>Modificar</button>
            </form>
        </div>
    )
}

export default ModifyProducts;

