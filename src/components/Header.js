import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/header.scss';

const Header = ({ showAdd, showFilter, deleteUser, logUser }) => {
    const [showmenu, setShowMenu] = useState(false);
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem("savedName");
        navigate("/");
    }


    return (
        <header className='header'>
            <div className='content'>
                <h2>Animal Adoption</h2>
                <button className='hamburger' onClick={() => setShowMenu(!showmenu)}><i className="fa-solid fa-bars"></i></button>
                {showmenu && <div className='headerMenu'>
                    <p>
                        <i className="fa-solid fa-user"></i>
                        {localStorage.getItem("savedName")}
                    </p>
                    <button onClick={() => showAdd()}>Dodaj Ogłoszenie </button>
                    <button onClick={() => showFilter()}>Filtruj</button>
                    <button onClick={() => logOut()}>Wyloguj</button>
                    <button onClick={() => deleteUser(logUser)}>Usuń konto</button>
                </div>}
            </div>
        </header>
    );
}

export default Header;