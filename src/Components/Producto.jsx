import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class Producto extends Component {
  render() {
    const item = this.props.producto;
    return (
      <Link to={`/producto/${item.idItem}`}>
        <div className="producto">
            <img src={item.img} alt={item.title} />
            <p className="titleAnime">{item.anime}</p>
            <p className="titleProducto">{item.title}</p>
            <p className="precioProducto">${item.price}</p>
            <p className="stockProducto">{item.stock ? "En stock" : "Sin stock"}</p>
        </div>
      </Link>
    )
  }
}

export default Producto