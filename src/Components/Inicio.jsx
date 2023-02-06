import React from 'react';
import '../styles/inicio.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Gallery from './Gallery';



const Inicio = () => {

    return (
        <main>
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} emulateTouch={true} showThumbs={false}>
                <div>
                    <img src="/img/banner1.png" alt='banner1' />
                </div>
                <div>
                    <img src="/img/banner2.png" alt='banner1' />
                </div>
                <div>
                    <img src="/img/banner3.png" alt='banner1' />
                </div>
            </Carousel>
            <div className="containerMain">
                <div className="containerSides">
                    <div className="containerGallery">
                        <h2 className="titleMain">LO MÁS NUEVO</h2>
                        <Gallery></Gallery>
                    </div>
                    <div className="containerTipos">
                        <h2 className="titleMain">PRODUCTOS</h2>
                        <div className="buttonsTipos">
                            <div className="tipoButton" onClick={() => window.open("/buscar/playera")}>
                                <img src="/img/playeras.svg" alt='banner1' />
                                <p>PLAYERAS</p>
                            </div>
                            <div className="tipoButton" onClick={() => window.open("/buscar/sudadera")}>
                                <img src="/img/sudaderas.svg" alt='banner1' />
                                <p>SUDADERAS</p>
                            </div>
                            <div className="tipoButton" onClick={() => window.open("/buscar/llavero")}>
                                <img src="/img/llaveros.svg" alt='banner1' />
                                <p>LLAVEROS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Inicio;
