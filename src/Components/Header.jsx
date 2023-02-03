import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/ShoppingCartProvider';
import '../styles/header.css';
import Dropdown from './Dropdown';
import { menuItems } from './MenuItems';

const Header = () => {

  const [toggle, setToggle] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [buscador, setBuscador] = useState("");

  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0)

  const animeList = [];

  const changeToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    axios.get('https://arekkutienda-api.onrender.com/api/listanimes')
      .then(res => {
        res.data.map(anime => animeList.push({
          slug: `/${anime.anime.replace(" ", "%20")}`,
          anchor: `${anime.anime}`,
        }));
        setAnimes(animeList);
      })
      .catch(err => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <div className="header-container">
        <div className="left-container">
          <a href="/">
            <img src="/img/logo.png" alt="" className="logo" />
          </a>
          <form className='formRight' action={`/buscar/${buscador}`}>
            <input type="search" value={buscador} required className='searchRight' onChange={(e) => setBuscador(e.target.value)}/>
            <i className="fa fa-search faRight" onClick={() => window.location = `/buscar/${buscador}`}></i>
          </form>
        </div>
        <div className={`right-container ${toggle ? "showMenu" : ""}`}>
          <div className="btn-carrito btn-right" onClick={() => {window.location = '/carrito'}}>
            <i className="fa-solid fa-cart-shopping"></i>
            <p>CARRITO</p>
            <p className="amountCarrito">{quantity}</p>
          </div>
          <div className="btn-login btn-right">
            <i className="fa-solid fa-user"></i>
            <p>INICIAR SESIÓN</p>
          </div>
          <div className="user-loged hidden">
            <div className="btn-right">
              <i className="fa-solid fa-user"></i>
              <p>Alex17072</p>
            </div>
            <p className="deslog">CERRAR SESIÓN</p>
          </div>
          <form className='formSearch' action={`/buscar/${buscador}`}>
            <input type="search" value={buscador} required className='inputSearch' onChange={(e) => setBuscador(e.target.value)}/>
            <i className="fa fa-search faSearch" onClick={() => window.location = `/buscar/${buscador}`}></i>
          </form>
        </div>
        <div className="bars" onClick={changeToggle}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className="list-menu">
        <ul className="list-buttons">
          {menuItems.map((menu, index) => {
            return (
              <li className={`menu-items ${menu.submenu ? "dropMenu" : ""}`} key={index}>
                {menu.submenu ? (
                  <>
                    <Dropdown dropdownTitle={menu.title} items={animes} />
                  </>
                ) : (
                  <a href={menu.url}>{menu.title}</a>
                )}

              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}


export default Header;
