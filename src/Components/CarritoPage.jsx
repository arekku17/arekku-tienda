/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { CartContext } from '../context/ShoppingCartProvider';
import '../styles/carrito.css';
import ItemCart from './ItemCart';

const CarritoPage = () => {
    const [cart, setCart] = useContext(CartContext);
    const subtotal = cart.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.price);
    }, 0)

    const enviarMensaje = () => {
        if (subtotal === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Agregue productos al carrito...',
                text: 'Necesita tener productos en el carrito para enviar mensaje',
            })
        }
        else {
            let message = "Buenas, quisiera pedir el siguiente pedido: %0A";
            cart.map((item, index) =>
                message += `${index + 1} - El producto ${item.idItem} con cantidad de ${item.quantity} en talla ${item.talla} %0A`
            )
            message += `El total es: $${subtotal}`;
            let url = "https://api.whatsapp.com/send?phone=529821845028&text=" + message
            window.open(url);
        }

    }

    return (
        <main>
            <div className="containerMain">
                <div className="carritoContainer">
                    <div className="left-body">
                        <h2 className="title-container">Productos</h2>
                        {cart.map(item => <ItemCart producto={item} key={"" + item.idItem + item.talla} />)}
                    </div>
                    <div className="right-body">
                        <h2 className="title-container">Resumen del pedido</h2>
                        <div className="top-resumen">
                            <div className="item-resumen">
                                <p className="left">Envio</p>
                                <p className="right">$0</p>
                            </div>
                            <div className="item-resumen">
                                <p className="left">Subtotal</p>
                                <p className="right">${subtotal}</p>
                            </div>
                        </div>
                        <div className="buttom-resumen">
                            <div className="item-resumen">
                                <p className="left">Total</p>
                                <p className="totalPrice">${subtotal}</p>
                            </div>
                            <button className="btnEnviar" onClick={enviarMensaje}><i className="fa-solid fa-paper-plane"></i> Enviar pedido</button>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default CarritoPage;
