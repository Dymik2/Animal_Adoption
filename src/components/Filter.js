import React, { useState } from 'react';
import "../scss/filter.scss";

const Filter = ({ isFilter, setIsFilter, showFilter, filterAnimal }) => {

    const [filtrType, setFiltrType] = useState("");
    const [filtrCity, setFiltrCity] = useState("");

    const turnOff = () => {
        setIsFilter(false);
        showFilter();
    }
    const handleClickFilter = (e) => {
        setIsFilter(true);
        filterAnimal(filtrType, filtrCity);
    }

    return (
        <div className='filter'>
            <form onSubmit={e => handleClickFilter(e)}>
                <h2>Filtry</h2>
                <input type="text" onChange={e => setFiltrType(e.target.value)} placeholder='Gatunek' />
                <input type="text" onChange={e => setFiltrCity(e.target.value)} placeholder='Miejscowość' />
                <button type="submit">Filtruj</button>
                <button onClick={() => turnOff()}>Wyłącz filrowanie</button>
            </form>
        </div>

    );
}

export default Filter;