import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Filter from './Filter';
import AddNotice from './AddNotice';
import { db } from './firebase-config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const MainApp = ({ deleteUser, logUser }) => {
    const [animal, setAnimal] = useState([]);
    const animalsCollectionRef = collection(db, "animal");
    const [add, setAdd] = useState(false);
    const [filtr, setFilter] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [filterList, setfilterList] = useState([]);

    useEffect(() => {
        const getAnimals = async () => {
            const data = await getDocs(animalsCollectionRef);
            setAnimal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getAnimals();
    }, [refresh]);


    const createAnimal = async (newAnimal) => {
        await addDoc(animalsCollectionRef, { nameUser: newAnimal.nameUser, Type: newAnimal.type, Race: newAnimal.race, Age: newAnimal.age, Phone: newAnimal.phone, City: newAnimal.city });
        setRefresh(!refresh);
    };

    const deleteAnimal = async (id) => {
        console.log(id);
        const animalDoc = doc(db, "animal", id);
        await deleteDoc(animalDoc);
        setRefresh(!refresh);
    };

    const filterAnimal = (type, city) => {
        setfilterList(animal.filter(el => {
            if (type === "") {
                return city === el.City;
            }
            if (city === "") {
                return type === el.Type;
            }
            else {
                return city === el.City && type === el.Type;
            }
        }));
        console.log(filterList);
    }

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
    console.log(isFilter);

    return (
        <>
            <Header showAdd={showAdd} showFilter={showFilter} deleteUser={deleteUser} logUser={logUser} />
            {filtr && <Filter isFilter={isFilter} setIsFilter={setIsFilter} showFilter={showFilter} filterAnimal={filterAnimal} />}
            {add && <AddNotice createAnimal={createAnimal} showAdd={showAdd} />}
            <MainContent animal={animal} deleteAnimal={deleteAnimal} isFilter={isFilter} filterList={filterList} />

        </>
    );
}

export default MainApp;