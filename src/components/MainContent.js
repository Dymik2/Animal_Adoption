import React from 'react';
import "../scss/mainContent.scss";

const MainContent = ({ animal, deleteAnimal, isFilter, filterList, showMoreInfo, showEdit }) => {

    return (
        <div className='mainContent'>
            {!isFilter && localStorage.length > 0 && animal.map((el, index) => {
                return <div key={index} className="notice">
                    <p>Zwierzę: {el.Type}</p>
                    <p>Rasa: {el.Race}</p>
                    <p>Wiek: {el.Age}</p>
                    <p>Telefon: {el.Phone}</p>
                    <p>Miasto: {el.City}</p>
                    <button disabled={el.nameUser !== localStorage.getItem("savedName")} onClick={() => showEdit(index)}><i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button disabled={el.nameUser !== localStorage.getItem("savedName")} onClick={() => deleteAnimal(el.id, el.namePhoto)}><i className="fa-solid fa-trash-can"></i>
                    </button>
                    <button className='showMore' onClick={() => showMoreInfo(index)}>Show More <i className="fa-solid fa-circle-arrow-right"></i>
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
                    <button disabled={el.nameUser !== localStorage.getItem("savedName")} onClick={() => showEdit(index)}><i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button disabled={el.nameUser !== localStorage.getItem("savedName")} onClick={() => deleteAnimal(el.id, el.namePhoto)}><i className="fa-solid fa-trash-can"></i></button>
                    <button className='showMore' onClick={() => showMoreInfo(index)}>Show More <i className="fa-solid fa-circle-arrow-right"></i>
                    </button>
                    <br />
                    <br />
                </div>
            })}
        </div>
    );
}

export default MainContent;