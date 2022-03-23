import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Filter from './Filter';
import AddNotice from './AddNotice';
import AnimalContent from './AnimalContent';
import { db } from './firebase-config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { storage } from './firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const MainApp = ({ deleteUser, logUser }) => {
    const [animal, setAnimal] = useState([]);
    const animalsCollectionRef = collection(db, "animal");
    const [add, setAdd] = useState(false);
    const [filtr, setFilter] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [filterList, setfilterList] = useState([]);
    const [showAnimal, setShowAnimal] = useState();
    const [showMain, setShowMain] = useState(true);
    const [url, setUrl] = useState("");

    useEffect(() => {
        const getAnimals = async () => {
            const data = await getDocs(animalsCollectionRef);
            setAnimal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getAnimals();
    }, [refresh]);


    const createAnimal = async (newAnimal) => {

        const sotrageRef = ref(storage, `files/${newAnimal.image.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, newAnimal.image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(prog)
                // setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                    console.log("File available at", downloadURL);
                });
            }
        );

        await addDoc(animalsCollectionRef, { nameUser: newAnimal.nameUser, Type: newAnimal.type, Race: newAnimal.race, Age: newAnimal.age, Phone: newAnimal.phone, City: newAnimal.city, description: newAnimal.description, urlImage: url });

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
    }

    const showMoreInfo = (index) => {
        //setshowAnimal(element);
        setShowMain(false);
        setShowAnimal(animal[index]);
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

    return (
        <>
            <Header showAdd={showAdd} showFilter={showFilter} deleteUser={deleteUser} logUser={logUser} showMain={showMain} />
            {filtr && <Filter isFilter={isFilter} setIsFilter={setIsFilter} showFilter={showFilter} filterAnimal={filterAnimal} />}
            {add && <AddNotice createAnimal={createAnimal} showAdd={showAdd} />}
            {!showMain && <AnimalContent showAnimal={showAnimal} setShowMain={setShowMain} />}
            {showMain && <MainContent animal={animal} deleteAnimal={deleteAnimal} isFilter={isFilter} filterList={filterList} showMoreInfo={showMoreInfo} />}
            {/* <img src={url} alt="Testowo" /> */}
        </>
    );
}

export default MainApp;