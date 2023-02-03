import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer>
            <p className="derechos">Todos los derechos reservados ® Arekku Tienda 2023 - 2024</p>
            <p className='titleRedes'>Redes Sociales</p>
            <div className="linksRedes">
                <div className="facebook">
                    <a href="https://www.facebook.com/arekkushop/">
                        <i className="fa-brands fa-facebook"></i>
                        <p className="social">Arekku Tienda</p>
                    </a>
                </div>
                <div className="whats">
                    <a href="https://wa.me/529821845028">
                        <i className="fa-brands fa-whatsapp"></i>
                        <p className="social">+52 982 184 5028</p>
                    </a>
                </div>
                <div className="locate">
                    <i className="fa-sharp fa-solid fa-location-dot"></i>
                    <p className="social direccion">Champotón, Campeche, México, C.P. 24400, C. 32 entre Av. Revolución y C. 23</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
