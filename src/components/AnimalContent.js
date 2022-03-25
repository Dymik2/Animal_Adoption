import React from 'react';
import "../scss/AnimalContent.scss";

const AnimalContent = ({ showAnimal, setShowMain }) => {
    console.log(showAnimal.urlImage);
    return (<div className='mainAnimalContent'>
        <img src={showAnimal.urlImage} alt="Brak zdjecia" />
        <div>
            <p>Zwierzę: {showAnimal.Type}</p>
            <p>Rasa: {showAnimal.Race}</p>
            <p>Wiek: {showAnimal.Age}</p>
            <p>Telefon: {showAnimal.Phone}</p>
            <p>Miasto: {showAnimal.City}</p>
            <p>Opis: {showAnimal.description}</p>
            <button onClick={() => setShowMain(true)}>Zamknij</button>
        </div>

    </div>);
}

export default AnimalContent;