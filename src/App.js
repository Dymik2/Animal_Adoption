import './App.css';
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import React, { useState } from 'react';
import {
  HashRouter, Route, Routes
} from 'react-router-dom';

function App() {
  return <HashRouter>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/mainapp' element={<MainApp />} />
    </Routes>
  </HashRouter>;
}

export default App;
