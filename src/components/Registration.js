import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "../scss/registration.scss";

const Registration = ({ addNewUser, users }) => {
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        password: "",
        repeatPassword: ""
    });

    const validation = () => {
        let duplicteName = "";
        if (newUser.name.length < 2) {
            return "Imie jest za krótkie";
        }
        if (newUser.password.length < 2) {
            return "Hasło jest za słabe";
        }
        if (newUser.password !== newUser.repeatPassword) {
            return "hasła różnią się od siebie";
        }
        users.forEach(user => {
            if (user.name === newUser.name) {
                duplicteName = "Istnieje już taki użytkownik, zmień nick";
            }
        })
        if (duplicteName !== "") {
            return duplicteName;
        }

        return null
    }

    const createNewUser = e => {
        e.preventDefault();
        const errorMsg = validation();
        if (errorMsg) {
            setError(errorMsg);
            return
        }
        addNewUser(newUser.name, newUser.password);
        navigate("/");
    }

    const handleParametr = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const backLogin = () => {
        navigate("/");
    }

    const navigate = useNavigate();

    return (<div className='registration'>
        <h1>Rejestracja do Animal Adoption</h1>
        <form onSubmit={e => createNewUser(e)}>
            {error && <p>{error}</p>}
            <input name="name" type="text" onChange={handleParametr} placeholder="Nick" />
            <input name="password" type="password" onChange={handleParametr} placeholder="Hasło" />
            <input name="repeatPassword" type="password" onChange={handleParametr} placeholder="Powtórz hasło" />
            <button type="submit">Zarejestruj</button>
            <button onClick={() => backLogin()}>Powrót</button>
        </form>

    </div>);
}

export default Registration;