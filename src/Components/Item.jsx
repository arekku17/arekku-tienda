import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from '../context/ShoppingCartProvider';
import '../styles/item.css';
import LoadingIndicator from './Common/LoadingIndicator';

function Item() {

    const [dataItem, setDataItem] = useState({});
    const [dataTalla, setTalla] = useState(0); //0 - CHICA  1 - MEDIANA  2 - GRANDE
    const [amount, setAmount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [cart, setCart] = useContext(CartContext);



    useEffect(() => {
        trackPromise(
        getItems().then(data => {
            console.log(data);
            setDataItem(data.data);
        }).catch(err => {
            console.log(err);
        })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const addToCart = () => {

        if (amount > 0) {
            console.log(amount);
            console.log(dataItem.tallas[dataTalla]);
            if (amount <= dataItem.tallas[dataTalla]) {
                setCart((currItems) => {
                    const isItemFound = currItems
                        .find((item) => item.idItem === dataItem.idItem && item.talla === tallaString(dataTalla));
                    console.log(isItemFound);
                    if (isItemFound) {
                        if ((isItemFound.quantity + amount) <= dataItem.tallas[dataTalla]) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Agregado producto exitosamente',
                                footer: '<a href="/carrito">Ir al carrito</a>'
                            })
                            return currItems.map((item) => {
                                if (item.idItem === dataItem.idItem && item.talla === tallaString(dataTalla)) {
                                    return { ...item, quantity: item.quantity + amount, talla: tallaString(dataTalla) }
                                } else {
                                    return item;
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se puede agregar m??s cantidad del stock...',
                                text: 'Ya tienes la cantidad igual al stock en tu carrito'
                            })
                            return currItems;
                        }
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Agregado producto exitosamente',
                            footer: '<a href="/carrito">Ir al carrito</a>'
                        })
                        return [...currItems, { ...dataItem, quantity: amount, talla: tallaString(dataTalla) }]
                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede agregar m??s cantidad del stock...',
                    text: 'Cambia la cantidad del producto a uno menor de lo que hay'
                })
            }

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Agrega m??s de un producto...',
                text: 'Cambia la cantidad del producto distinto a cero!'
            })
        }
    };

    const params = useParams();

    const tallaString = (num) => {
        let talla = "";
        if (num === 0) talla = "CHICA";
        if (num === 1) talla = "MEDIANA";
        if (num === 2) talla = "GRANDE";
        return talla;
    }

    const changeTalla = (newTalla) => {
        setTalla(newTalla);
        setAmount(0);
        setSubtotal(0);
    }
    
    const getItems = () => {
        const promise = new Promise((resolve) => {
            const url = `https://arekkutienda-api.onrender.com/api/producto/${params.id}`;
            resolve(axios.get(url).then(
                response => response
            ).catch(err => {
                console.log(err);
            }));
        });
        return promise;
    };

    const getDescripcion = () => {
        if (dataItem.tipo === "playera") {
            return <>
                <p className="descripcion">Esta playera es la indicada para tu vida y estilo de anime urbano, bastante comodo y con calidad duradera, con el mejor dise??o que combien con tu outfit</p>
                <ul>
                    <li><span className='bold'>Material:</span> 100% algod??n.</li>
                    <li><span className='bold'>Estampado:</span> DTF con acabado ligero.</li>
                </ul>
            </>
        }
        if (dataItem.tipo === "sudadera") {
            return <>
                <p className="descripcion">Esta sudadera es la indicada para tu vida y estilo de anime urbano, bastante comodo y con calidad duradera, con el mejor dise??o que combien con tu outfit</p>
                <ul>
                    <li><span className='bold'>Material:</span> 100% algod??n.</li>
                    <li><span className='bold'>Estampado:</span> Vinil con acabado ligero</li>
                </ul>
            </>
        }
        if (dataItem.tipo === "llavero") {
            return <>
                <p className="descripcion">Este llavero es el adecuado para tu vida y estilo de anime urbano, para colocarlo en tus bultos, mochilas o llaves dando un estilo ??nico</p>
                <ul>
                    <li><span className='bold'>Dimensiones:</span> 3cm x 13cm</li>
                    <li><span className='bold'>Bordado:</span> El producto es de doble cara, mostrando diferentes patrones</li>
                </ul>
            </>
        }
    }

    return (
        <main>
            <div className="containerMain">
                <LoadingIndicator />
                <div className="datosContainer">
                    <div className="leftContainer">
                        <img src={dataItem.img} alt={dataItem.title} />
                    </div>
                    <div className="rightContainer">
                        <p className="animeItem">{dataItem.anime}</p>
                        <p className="titleItem">{dataItem.title}</p>
                        <p className="priceItem">${dataItem.price}</p>
                        {dataItem.stock ?
                            <>
                                <div className="tallasContainer">
                                    <p>Talla: <span className="bold">{tallaString(dataTalla)}</span></p>
                                    <p className="cantidad">En stock: {dataItem.tallas ? dataItem.tallas[dataTalla] : ""}</p>
                                    <div className="tallasButtons">
                                        <button className={dataTalla === 0 ? "select" : ""} onClick={() => { changeTalla(0) }}>CH</button>
                                        <button className={dataTalla === 1 ? "select" : ""} onClick={() => { changeTalla(1) }}>M</button>
                                        <button className={dataTalla === 2 ? "select" : ""} onClick={() => { changeTalla(2) }}>G</button>
                                    </div>
                                </div>
                                {
                                    dataItem.tallas[dataTalla] > 0 ?
                                        <>
                                            <p>Cantidad:</p>
                                            <input type="number" value={amount} min="0" max={dataItem.tallas ? dataItem.tallas[dataTalla] : "0"} onChange={(e) => {
                                                setAmount(parseInt(e.target.value));
                                                setSubtotal(e.target.value * dataItem.price)
                                            }} />
                                            <p className="subtotal">Subtotal: <span className="bold">${subtotal}</span></p>
                                            <button className="addCart" onClick={addToCart}>Agregar al carrito</button>
                                        </>
                                        :
                                        <>

                                        </>
                                }

                            </>
                            :
                            <>
                                <p>No hay disponibles.</p>
                            </>
                        }

                    </div>
                </div>
                <div className="descripcionContainer">
                    <h2>Descripci??n</h2>
                    {
                        getDescripcion()
                    }

                </div>
            </div>
        </main>
    )
}

export default Item