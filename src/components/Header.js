import React from 'react';


const Header = ({ showAdd, showFilter }) => {
    return (
        <header>
            <h2>Animal Adoption</h2>
            <button onClick={() => showAdd()}>Dodaj Ogłoszenie </button>
            <button onClick={() => showFilter()}>Filtruj</button>
            <p>{localStorage.getItem("savedName")}</p>
        </header>
    );
}

export default Header;