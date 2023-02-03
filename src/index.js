import React from 'react';
import ReactDOM from 'react-dom/client';
import Item from './Components/Item';
import Productos from './Components/Productos';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './index.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import CarritoPage from './Components/CarritoPage';
import { ShoppingCartProvider } from './context/ShoppingCartProvider';
import Inicio from './Components/Inicio';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

export default function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={< Inicio />} />
              <Route path='/productos' element={< Productos rutaProducto="Todos los productos" modo="todos" />} />
              <Route path='/:anime' element={< Productos rutaProducto="Filtro por anime" modo="anime" />} />
              <Route path='/buscar/:busqueda' element={< Productos rutaProducto="Busqueda" modo="buscador" />} />
              <Route path="/producto">
                <Route path=':id' element={<Item />} />
              </Route>
              <Route path='/carrito' element={< CarritoPage />} />
              {/* ... etc. */}
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ShoppingCartProvider>
    </>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

