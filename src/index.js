import React from 'react';
import ReactDOM from 'react-dom/client';
import Item from './Components/Item';
import Productos from './Components/Productos';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './index.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CarritoPage from './Components/CarritoPage';
import { ShoppingCartProvider } from './context/ShoppingCartProvider';
import Inicio from './Components/Inicio';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path='' element={< Inicio />} />
      <Route path='/productos' element={< Productos rutaProducto="Todos los productos" modo="todos" />} />
      <Route path='/:anime' element={< Productos rutaProducto="Filtro por anime" modo="anime" />} />
      <Route path='/buscar/:busqueda' element={< Productos rutaProducto="Busqueda" modo="buscador" />} />
      <Route path="/producto">
        <Route path=':id' element={<Item />} />
      </Route>
      <Route path='/carrito' element={< CarritoPage />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ShoppingCartProvider>
    <Header />
    <RouterProvider router={router} />
    <Footer />
    </ShoppingCartProvider>
  </>
  
);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//     <Header />
//     <Router>
//       <Routes>
//         <Route exact path='/' element={<></>} />
//         <Route path='/productos' element={< Productos rutaProducto="Todos los productos" modo="todos" />} />
//         <Route path='/:anime' element={< Productos rutaProducto="Busqueda por anime" modo="anime" />} />
//         <Route path='/producto/:id' element={<Item />} />
//       </Routes>
//     </Router>
//     <Footer />
//   </>

// );
