
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const URI = 'http://localhost:3000/'; 

const Menu = ()=>{
    return(
        <div className='container'>
            <div>
                <Link to={'/products'} className="btn btn-info btn-lg">Products</Link>
            </div>
            <div>
                <Link to={'/business'} className="btn btn-info btn-lg">Business</Link>
            </div>
            <div>
                <Link to={'/sellers'} className="btn btn-info btn-lg">Sellers</Link>
            </div>
            <div>
                <Link to={'/clients'} className="btn btn-info btn-lg">Clients</Link>
            </div>
        </div>
    )
}

export default Menu;

