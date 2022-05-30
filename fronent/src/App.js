import './App.css';

import ShowProducts from './productos/showproducts.js';
import ModifyProducts from './productos/modifyproducts.js';
import AddProducts from './productos/addproducts';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowProducts/>}/>
          <Route path='/create' element={<AddProducts/>}/>
          <Route path='/edit/:id' element={<ModifyProducts/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
