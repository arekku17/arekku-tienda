import React, { useEffect, useState } from 'react';
import Producto from './Producto';
import "../styles/producto.css";
import axios from 'axios';
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./Common/LoadingIndicator";


const Productos = (props) => {

    const [dataItems, setDataItems] = useState([]);
    const [dataItemsAux, setDataItemsAux] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsxPagina, setItemsxPagina] = useState(0);
    const params = useParams();


    useEffect(() => {
        let url = ""
        //Todos
        if (props.modo === "todos") {
            url = "https://arekkutienda-api.onrender.com/api/producto";
        }
        //Buscar por anime
        if (props.modo === "anime") {
            url = `https://arekkutienda-api.onrender.com/api/producto/anime/${params.anime}`;
        }
        //Por el buscador
        if (props.modo === "buscador") {
            url = `https://arekkutienda-api.onrender.com/api/search/${params.busqueda}`;
        }


        trackPromise(
            getItems(url).then(items => {
                setDataItems(items);
                setDataItemsAux(items);
                setItemsxPagina(10);
            })
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeOrdenar = (e) => {
        if (e === "newest") {
            let arrayReverse = dataItemsAux.slice().reverse();
            console.log(dataItemsAux);
            setDataItems(arrayReverse);
        }
        if (e === "older") {
            setDataItems(dataItemsAux);
        }

        if (e === "cheaper") {
            let arrayCheaper = dataItemsAux.slice();
            arrayCheaper.sort((a, b) => a.price - b.price)
            setDataItems(arrayCheaper);
        }

        if (e === "expensive") {
            let arrayCheaper = dataItemsAux.slice();
            arrayCheaper.sort((a, b) => b.price - a.price)
            setDataItems(arrayCheaper);
        }
    }

    const changePage = (num) => {
        return setPage(num);
    };

    const getItems = (url) => {
        const promise = new Promise((resolve) => {
            resolve(axios.get(url).then(
                response => response.data
            ));
        });
        return promise;
    };


    return (
        <main>
            <div className="containerMain">
                <div className="rutaTitle">
                    <h2>Inicio / {props.rutaProducto}</h2>
                </div>
                <div className="opcionesPaginacion">
                    <form action="" className='formFiltros'>
                        <div className="opcionArticulos">
                            <p>Articulos por Página:</p>
                            <input type="number" min="1" max="30" value={itemsxPagina} onChange={(e) => setItemsxPagina(parseInt(e.target.value))} />
                        </div>
                        <div className="opcionOrdenar">
                            <p>Ordenar</p>
                            <select onChange={(e) => { changeOrdenar(e.target.value); }} defaultValue={'older'}>
                                <option value="newest">Más reciente</option>
                                <option value="older">Más antiguo</option>
                                <option value="cheaper">Más barato</option>
                                <option value="expensive">Más caro</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="productosContainer">
                <LoadingIndicator />
                    {
                        dataItems.slice(page, page + itemsxPagina)
                            .map((item) =>
                                <div className="containerProducto">
                                    <Producto producto={item} key={item.idItem} ></Producto>
                                </div>
                                )
                    }
                </div>
                <Pagination changePage={changePage} items={dataItems} itemsPerPage={itemsxPagina} />
            </div>
        </main>
    )
}

export default Productos
