import React, { useState } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Filter from './Filter';
import AddNotice from './AddNotice';

const MainApp = () => {

    const [add, setAdd] = useState(false);
    const [filtr, setFilter] = useState(false);

    const showAdd = () => {
        setAdd(!add);
        if (filtr) {
            setFilter(!filtr);
        }
    }

    const showFilter = () => {
        setFilter(!filtr);
        if (add) {
            setAdd(!add);
        }
    }
    return (
        <>
            <Header showAdd={showAdd} showFilter={showFilter} />
            {filtr && <Filter />}
            {add && <AddNotice />}
            <MainContent />
        </>
    );
}

export default MainApp;