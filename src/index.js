import React from 'react';
import ReactDOM from 'react-dom/client';
import Item from './components/Item';
import Productos from './components/Productos';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import CarritoPage from './components/CarritoPage';
import { ShoppingCartProvider } from './context/ShoppingCartProvider';
import Inicio from './components/Inicio';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

export default function App() {
  return (
    <React.StrictMode>
      <ShoppingCartProvider>
        <Header />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio/>}/>
              <Route path='/productos' element={< Productos rutaProducto="Todos los productos" modo="todos" />} />
              <Route path='/:anime' element={< Productos rutaProducto="Filtro por anime" modo="anime" />} />
              <Route path='/buscar/:busqueda' element={< Productos rutaProducto="Busqueda" modo="buscador" />} />
              <Route path="/producto/:id" element={<Item />} />
              <Route path='/carrito' element={< CarritoPage />} />
            </Routes>
        </BrowserRouter>    
        <Footer />
        </ShoppingCartProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);