import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Filter from './Filter';
import AddNotice from './AddNotice';
import EditNotice from './EditNotice';
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
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

const MainApp = ({ deleteUser, logUser }) => {
    const [animal, setAnimal] = useState([]);
    const animalsCollectionRef = collection(db, "animal");
    const [add, setAdd] = useState(false);
    const [filtr, setFilter] = useState(false);
    const [edit, setEdit] = useState(false);
    const [elEdit, setElEdit] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [filterList, setfilterList] = useState([]);
    const [showAnimal, setShowAnimal] = useState();
    const [showMain, setShowMain] = useState(true);


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

        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    addDoc(animalsCollectionRef, { nameUser: newAnimal.nameUser, Type: newAnimal.type, Race: newAnimal.race, Age: newAnimal.age, Phone: newAnimal.phone, City: newAnimal.city, description: newAnimal.description, urlImage: downloadURL, namePhoto: newAnimal.image.name });
                    setRefresh(!refresh);
                });

            }
        );
    };
    const updateAnimal = async (updateAnimal) => {
        const animalDoc = doc(db, "animal", updateAnimal.id);
        updateDoc(animalDoc, { nameUser: updateAnimal.nameUser, Type: updateAnimal.type, Race: updateAnimal.race, Age: updateAnimal.age, Phone: updateAnimal.phone, City: updateAnimal.city, description: updateAnimal.description, urlImage: updateAnimal.urlImage, namePhoto: updateAnimal.namePhoto });
        setEdit(false);
        setRefresh(!refresh);

    }

    const deleteAnimal = async (id, namePhoto) => {
        const animalDoc = doc(db, "animal", id);
        await deleteDoc(animalDoc);
        const desertRef = ref(storage, "files/" + namePhoto)
        deleteObject(desertRef).then(() => {
            console.log("deleted")
        }).catch((error) => {
            console.log("Something went wrong");
        })
        setRefresh(!refresh);
    };

    const filterAnimal = (type, city) => {
        if (type === "") {
            setfilterList(animal.filter(el => {
                return el.City.toLowerCase().indexOf(city.toLowerCase()) !== -1
            }));
        }
        if (city === "") {
            setfilterList(animal.filter(el => {
                return el.Type.toLowerCase().indexOf(type.toLowerCase()) !== -1
            }));
        }
        if (city !== "" && type !== "") {
            setfilterList(animal.filter(el => {
                return el.Type.toLowerCase().indexOf(type.toLowerCase()) !== -1 && el.Type.toLowerCase().indexOf(type.toLowerCase()) !== -1
            }));
        }
    }

    const showMoreInfo = (index) => {
        if (filtr) {
            setFilter(!filtr);
        }
        if (edit) {
            setEdit(!edit);
        }
        setShowMain(false);
        setShowAnimal(animal[index]);
    }

    const showAdd = () => {
        setAdd(!add);
        if (filtr) {
            setFilter(!filtr);
        }
        if (edit) {
            setEdit(!edit);
        }
    }

    const showFilter = () => {
        setFilter(!filtr);
        setIsFilter(false);
        if (add) {
            setAdd(!add);
        }
        if (edit) {
            setEdit(!edit);
        }
    }

    const showEdit = (el) => {
        if (filtr) {
            setFilter(!filtr);
        }
        if (add) {
            setAdd(!add);
        }
        setEdit(!edit);
        setElEdit(prevState => prevState = animal[el]);
    }

    return (
        <>
            <Header showAdd={showAdd} showFilter={showFilter} deleteUser={deleteUser} logUser={logUser} showMain={showMain} />
            {edit && <EditNotice elEdit={elEdit} updateAnimal={updateAnimal} />}
            {filtr && <Filter isFilter={isFilter} setIsFilter={setIsFilter} showFilter={showFilter} filterAnimal={filterAnimal} />}
            {add && <AddNotice createAnimal={createAnimal} showAdd={showAdd} />}
            {!showMain && <AnimalContent showAnimal={showAnimal} setShowMain={setShowMain} />}
            {showMain && <MainContent animal={animal} deleteAnimal={deleteAnimal} isFilter={isFilter} filterList={filterList} showMoreInfo={showMoreInfo} showEdit={showEdit} />}
        </>
    );
}

export default MainApp;