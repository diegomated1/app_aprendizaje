import './App.css';

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

import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/products' element={<ShowProducts/>}/>
          <Route path='/products/create' element={<AddProducts/>}/>
          <Route path='/products/edit/:id' element={<ModifyProducts/>}/>

          <Route path='/business' element={<ShowBusiness/>}/>
          <Route path='/business/create' element={<AddBusiness/>}/>
          <Route path='/business/edit/:id' element={<ModifyBusiness/>}/>

          <Route path='/clients' element={<ShowClients/>}/>
          <Route path='/clients/create' element={<AddClients/>}/>
          <Route path='/clients/edit/:id' element={<ModifyClients/>}/>

          <Route path='/sellers' element={<ShowSellers/>}/>
          <Route path='/sellers/create' element={<AddSellers/>}/>
          <Route path='/sellers/edit/:id' element={<ModifySellers/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
