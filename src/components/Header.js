import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/header.scss';

const Header = ({ showAdd, showFilter, deleteUser, logUser, showMain }) => {
    const [showmenu, setShowMenu] = useState(false);
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem("savedName");
        navigate("/");
    }

    const handleFilterClick = () => {
        setShowMenu(false);
        showFilter();
    }

    /*if (window.innerWidth > 1023) {
        setShowMenu(true);
        console.log(window.innerWidth);
    }*/

    const handleAddClick = () => {
        setShowMenu(false);
        showAdd();
    }

    return (
        <header className='header'>
            <div className='content'>
                <h2>Animal Adoption</h2>
                <button className='hamburger' onClick={() => setShowMenu(!showmenu)}><i className="fa-solid fa-bars"></i></button>
                <div className={showmenu === true ? "headerMenu" : "headerMenu active"} >
                    <p>
                        <i className="fa-solid fa-user"></i>
                        {localStorage.getItem("savedName")}
                    </p>
                    <div>
                        <button onClick={() => handleAddClick()}>Dodaj Ogłoszenie </button>
                        {showMain && <button onClick={() => handleFilterClick()}>Filtruj</button>}
                        <button onClick={() => logOut()}>Wyloguj</button>
                        <button onClick={() => deleteUser(logUser)}>Usuń konto</button>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;