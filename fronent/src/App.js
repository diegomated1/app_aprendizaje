
import SignIn from './users/signin.js';
import LogIn from './users/login.js';

import Menu from './menu/menu';

import ShowProducts from './products/showproducts.js';
import ModifyProducts from './products/modifyproducts.js';
import AddProducts from './products/addproducts.js';

import ShowBusiness from './business/showbusiness.js';
import AddBusiness from './business/addbusiness.js';
import ModifyBusiness from './business/modifybusiness.js';

import ShowClients from './clientes/showclients.js';
import AddClients from './clientes/addclients.js';
import ModifyClients from './clientes/modifyclients.js';

import ShowSellers from './sellers/showsellers.js';
import AddSellers from './sellers/addsellers.js';
import ModifySellers from './sellers/modifysellers.js';

import ShowFacturas from './facturas/showfacturas.js';
import AddFactura from './facturas/addfacturas.js';
import ModifyFactura from './facturas/modifyfacturas.js';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Test from './testing/test.js';


function App() {
  var iduser = localStorage.getItem('iduser');
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={(iduser!==null) ? <Navigate to={`/${iduser}`}/> : <Navigate to='/login'/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signin' element={<SignIn/>}/>

          <Route exact path='/:iduser' element={<Menu/>}/>

          <Route exact path='/:iduser/products' element={<ShowProducts/>}/>
          <Route path='/:iduser/products/create' element={<AddProducts/>}/>
          <Route path='/:iduser/products/edit/:id' element={<ModifyProducts/>}/>

          <Route exact path='/:iduser/business' element={<ShowBusiness/>}/>
          <Route path='/:iduser/business/create' element={<AddBusiness/>}/>
          <Route path='/:iduser/business/edit/:id' element={<ModifyBusiness/>}/>

          <Route exact path='/:iduser/clients' element={<ShowClients/>}/>
          <Route path='/:iduser/clients/create' element={<AddClients/>}/>
          <Route path='/:iduser/clients/edit/:id' element={<ModifyClients/>}/>

          <Route exact path='/:iduser/sellers' element={<ShowSellers/>}/>
          <Route path='/:iduser/sellers/create' element={<AddSellers/>}/>
          <Route path='/:iduser/sellers/edit/:id' element={<ModifySellers/>}/>

          <Route exact path='/:iduser/facturas' element={<ShowFacturas/>}/>
          <Route path='/:iduser/facturas/create' element={<AddFactura/>}/>
          <Route path='/:iduser/facturas/edit/:id' element={<ModifyFactura/>}/>

          <Route exact path='/test' element={<Test/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
