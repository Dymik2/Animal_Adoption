import React from 'react';


const Filter = () => {
    return (
        <div>
            <form action="">
                <input type="text" placeholder='Gatunek' />
                <input type="text" placeholder='Rasa' />
                <input type="text" placeholder='wiek' />
                <input type="text" placeholder='Miejscowość' />
                <button>Zapisz</button>
            </form>
        </div>

    );
}

export default Filter;