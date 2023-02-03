/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";

const Pagination = ({ changePage, items, itemsPerPage }) => {
    const [pageCount, setPageCount] = useState(0); //Variable para señalar en que numero de pagina vamos
    const [itemOffset, setItemOffset] = useState(0); //Es el item que inicia el offset

    useEffect(() => {
        setPageCount(Math.ceil(items.length / itemsPerPage)); //Formula para sacar cuantas páginas hay en total de los items obtenidos del API
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemOffset, items, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `Usuario eligió la pagina ${event.selected}, El cual tiene un offset de ${newOffset}`
        // );
        setItemOffset(newOffset);
        changePage(newOffset);
    };

    return (
        <>
            <ReactPaginate
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                nextLabel=">"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active-pag"
            />
        </>
    );
};

export default Pagination;