
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/product'; 


const ShowProducts = ()=>{
    const iduser = localStorage.getItem('iduser');

    const [products, setproducts] = useState([]);
    
    useEffect(()=>{
        getproduct();
    }, []);

    const getproduct = async () => {
        const res = await axios.get(`${URI}/${iduser}`);
        setproducts(res.data);
    }

    const deleteproduct = async (id) => {
        await axios.delete(`${URI}/${iduser}/${id}`);
        getproduct();
    }

    return(
        <div className='container'>
            <Link to='create' className='btn btn-primary'>Añadir</Link>
            <table className='table'>
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
                    {products.map((product)=>(
                        <tr key={product.idproducto}>
                            <td>{product.idproducto}</td>
                            <td>{product.nombre}</td>
                            <td>{product.idempresa}</td>
                            <td>{product.valor}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Link to={`edit/${product.idproducto}`} className="btn btn-info">Edit</Link>
                                <button onClick={()=>deleteproduct(product.idproducto)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowProducts;

