import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "../scss/loginMain.scss";

const Login = ({ users, setLogUser }) => {

    const [form, setForm] = useState({
        name: '',
        password: ''
    });
    const [check, setCheck] = useState(true);
    const [login, setLogin] = useState(true);

    const updateForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        if (form.name.length > 1 && form.password.length > 1) {
            setCheck(false);
        }
        else {
            setCheck(true);
        }
    }

    const handleClickLogin = (e) => {
        e.preventDefault();
        console.log(users);
        users.forEach(user => {
            console.log(user);
            if (form.password === user.password && form.name === user.name) {
                localStorage.setItem('savedName', form.name);
                console.log(localStorage.getItem("savedName"));
                setLogUser(user.id);
                navigate("/mainapp");
                setLogin(true)
            }
        })
        setLogin(false)
    }

    const handleClickRegistration = () => {
        navigate("/registration");
    }

    const navigate = useNavigate()

    return (
        <div className='loginMain'>
            <h1>Animal Adoption</h1>
            <form onSubmit={e => handleClickLogin(e)}>
                {!login && <p>Błędny login lub hasło</p>}
                <input name="name" type="text" onChange={updateForm} placeholder="Nick" />
                <input name="password" type="password" onChange={updateForm} placeholder="Hasło" />
                <button disabled={check} type="submit">Zaloguj</button>
                <br />
                <button onClick={() => handleClickRegistration()}>Zarejestruj się</button>
            </form>


        </div>
    );
}

export default Login;