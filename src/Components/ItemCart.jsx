import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/ShoppingCartProvider';

const ItemCart = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [cart, setCart] = useContext(CartContext);

    const addToCart = () => {
        setCart((currItems) => {
            const isItemFound = currItems.find((item) => item.idItem === props.producto.idItem);
            if (isItemFound) {
                return currItems.map((item) => {
                    if (item.idItem === props.producto.idItem) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currItems, { ...props.producto, quantity: 1 }]
            }
        })
    };

    const removeItem = (id) => {
        setCart(currItems => {
            if (currItems.find(item => item.idItem === props.producto.idItem)?.quantity === 1) {
                return currItems.filter((item) => item.idItem !== id);
            }
            else {
                return currItems.map((item) => {
                    if (item.idItem === props.producto.idItem) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    };

    const deleteItem = (id) => {
        setCart(currItems => currItems.filter((item) => item.idItem !== id))
    };

    return (
        <div className="item-shop">
            <Link to= {`/producto/${props.producto.idItem}`}>
            <img src={props.producto.img} alt="" />
            </Link>
            <div className="info-item">
                <p className="anime">{props.producto.anime}</p>
                <p className="title">{props.producto.title}</p>
                <p className="talla">{props.producto.talla}</p>
                <p className="price">${props.producto.price}</p>
                <div className="opc-item">
                    <p className="amount">{props.producto.quantity}</p>
                    <div className="amountOpc">
                        <button className="plus" onClick={addToCart}><i className="fa-solid fa-plus"></i></button>
                        <button className="minus" onClick={() => removeItem(props.producto.idItem)}><i className="fa-solid fa-minus"></i></button>
                    </div>
                    <button className="delete" onClick={() => deleteItem(props.producto.idItem)}><i className="fa-solid fa-trash"></i></button>
                </div>

            </div>
        </div>
    );
}

export default ItemCart;
