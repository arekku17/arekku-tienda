import React from 'react'
import Carousel from 'better-react-carousel'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Producto from './Producto';


const Gallery = () => {

  const [dataItems, setDataItems] = useState([]);

  useEffect(() => {
    axios.get("https://arekkutienda-api.onrender.com/api/producto")
      .then(res => {
        setDataItems(res.data.slice().reverse());
      })
      .catch(err => {
        console.log(err);
      })
  })

  return (
    <Carousel cols={3} rows={1} gap={30} mobileBreakpoint={400}>
      {
        dataItems.slice(0,12).map(item =>
          <Carousel.Item>
            <Producto producto={item} key={item.idItem} ></Producto>
          </Carousel.Item>
        )
      }
    </Carousel>
  )
}

export default Gallery;
