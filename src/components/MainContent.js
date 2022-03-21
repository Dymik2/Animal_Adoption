import React from 'react';
import "../scss/mainContent.scss";

const MainContent = ({ animal, deleteAnimal, isFilter, filterList }) => {



    return (
        <div className='mainContent'>
            {!isFilter && localStorage.length > 0 && animal.map((el, index) => {
                return <div key={index} className="notice">
                    <p>Zwierzę: {el.Type}</p>
                    <p>Rasa: {el.Race}</p>
                    <p>Wiek: {el.Age}</p>
                    <p>Telefon: {el.Phone}</p>
                    <p>Miasto: {el.City}</p>
                    <button disabled={el.nameUser !== localStorage.getItem("savedName")} onClick={() => deleteAnimal(el.id)}><i className="fa-solid fa-trash-can"></i>
                    </button>
                    <br />
                    <br />
                </div>
            })}

            {isFilter && localStorage.length > 0 && filterList.map((el, index) => {
                return <div key={index} className="notice">
                    <p>Zwierzę: {el.Type}</p>
                    <p>Rasa: {el.Race}</p>
                    <p>Wiek: {el.Age}</p>
                    <p>Telefon: {el.Phone}</p>
                    <p>Miasto: {el.City}</p>
                    <button disabled={el.nameUser !== localStorage.getItem("savedName")} onClick={() => deleteAnimal(el.id)}><i className="fa-solid fa-trash-can"></i></button>
                    <br />
                    <br />
                </div>
            })}
        </div>
    );
}

export default MainContent;