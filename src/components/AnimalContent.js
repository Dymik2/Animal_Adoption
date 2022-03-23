import React from 'react';
import "../scss/AnimalContent.scss";

const AnimalContent = ({ showAnimal, setShowMain }) => {

    return (<div className='mainAnimalContent'>
        <img src={showAnimal.urlImage} alt="Test" />
        <p>Zwierzę: {showAnimal.Type}</p>
        <p>Rasa: {showAnimal.Race}</p>
        <p>Wiek: {showAnimal.Age}</p>
        <p>Telefon: {showAnimal.Phone}</p>
        <p>Miasto: {showAnimal.City}</p>
        <p>Opis: {showAnimal.description}</p>
        <button onClick={() => setShowMain(true)}>Zamknij</button>
    </div>);
}

export default AnimalContent;