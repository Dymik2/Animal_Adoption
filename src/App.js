import './App.scss';
import Login from "./components/Login";
import Registration from "./components/Registration";
import MainApp from "./components/MainApp";
import React, { useState, useEffect } from 'react';
import {
  HashRouter, Route, Routes
} from 'react-router-dom';
import { db } from './components/firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [logUser, setLogUser] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();

  }, [refreshUsers]);

  const addNewUser = async (name, password) => {
    console.log(name, password);
    await addDoc(usersCollectionRef, { name: name, password: password });
    setRefreshUsers(!refreshUsers);
  };

  const deleteUser = async () => {
    console.log(logUser);
    const userDoc = doc(db, "users", logUser);
    await deleteDoc(userDoc);
    setRefreshUsers(!refreshUsers);
  };

  return <HashRouter>
    <Routes >
      <Route exact path='/' element={<Login users={users} setLogUser={setLogUser} />} />
      <Route exact path='/registration' element={<Registration addNewUser={addNewUser} users={users} />} />
      <Route path='/mainapp' element={<MainApp deleteUser={deleteUser} logUser={logUser} />} />
    </Routes>
  </HashRouter>;
}

export default App;
