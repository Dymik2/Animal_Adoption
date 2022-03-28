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
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

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
    //const [url, setUrl] = useState("");

    useEffect(() => {
        const getAnimals = async () => {
            const data = await getDocs(animalsCollectionRef);
            setAnimal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getAnimals();
    }, [refresh]);

    const addDescription = async (downloadURL, newAnimal) => {
        console.log(newAnimal);
        await addDoc(animalsCollectionRef, { nameUser: newAnimal.nameUser, Type: newAnimal.type, Race: newAnimal.race, Age: newAnimal.age, Phone: newAnimal.phone, City: newAnimal.city, description: newAnimal.description, urlImage: downloadURL, namePhoto: newAnimal.image.name });
        setRefresh(!refresh);
    }


    const createAnimal = async (newAnimal) => {

        const sotrageRef = ref(storage, `files/${newAnimal.image.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, newAnimal.image);

        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // console.log(prog)
                // setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    // setUrl(downloadURL);
                    // console.log(url);
                    addDoc(animalsCollectionRef, { nameUser: newAnimal.nameUser, Type: newAnimal.type, Race: newAnimal.race, Age: newAnimal.age, Phone: newAnimal.phone, City: newAnimal.city, description: newAnimal.description, urlImage: downloadURL, namePhoto: newAnimal.image.name });
                    setRefresh(!refresh);
                    // addDescription(downloadURL, newAnimal);

                });

            }

        );
        // console.log(uploadTask.snapshot.ref);
        // console.log(getDownloadURL(uploadTask.snapshot.ref).downloadURL);
        // await setTimeout(() => { console.log("World!"); }, 3000);
        // await addDoc(animalsCollectionRef, { nameUser: newAnimal.nameUser, Type: newAnimal.type, Race: newAnimal.race, Age: newAnimal.age, Phone: newAnimal.phone, City: newAnimal.city, description: newAnimal.description, urlImage: url, namePhoto: newAnimal.image.name });

        // setRefresh(!refresh);
    };

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
        if (filtr) {
            setFilter(!filtr);
        }
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