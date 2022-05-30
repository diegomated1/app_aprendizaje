
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/product'; 


const ShowProducts = ()=>{
    const [products, setproduct] = useState([]);

    useEffect(()=>{
        getproduct()
    }, []);

    const getproduct = async () => {
        const res = await axios.get(URI);
        setproduct(res.data);
    }

    const deleteproduct = async (id) => {
        await axios.delete(`${URI}${id}`);
        getproduct();
    }

    return(
        <table style={{"border": "1px solid"}}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Id Empresa</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>{
                    return(
                        <tr>
                            <td>{product.idproducto}</td>
                            <td>{product.nombre}</td>
                            <td>{product.idempresa}</td>
                            <td>{product.valor}</td>
                            <td>{product.stock}</td>
                            <td>
                                <link to={`/edit/${product.idproducto}`} className="btn btn-info">Edit</link>
                                <button onClick={()=>deleteproduct(product.idproducto)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ShowProducts;

