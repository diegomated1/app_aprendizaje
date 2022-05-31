
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:3000/'; 

const Menu = ()=>{
    var iduser = localStorage.getItem('iduser');

    const navigate = useNavigate();

    const cerrarsesion = ()=>{
        localStorage.removeItem('iduser');
        navigate('/login');
    };

    return(
        <div className='container'>
            <div>
                <Link to={`/${iduser}/products`} className="btn btn-info btn-lg">Products</Link>
            </div>
            <div>
                <Link to={`/${iduser}/business`} className="btn btn-info btn-lg">Business</Link>
            </div>
            <div>
                <Link to={`/${iduser}/sellers`} className="btn btn-info btn-lg">Sellers</Link>
            </div>
            <div>
                <Link to={`/${iduser}/clients`} className="btn btn-info btn-lg">Clients</Link>
            </div>
            <div>
                <button onClick={cerrarsesion} className='btn btn-warning'>Cerrar Sesion</button>
            </div>
        </div>
    )
}

export default Menu;

