import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [userName, setUserName] = useState("");
    const [check, setCheck] = useState(true);


    const handleInput = (e) => {
        setUserName(e.target.value)
        if (userName.length > 1) {
            setCheck(false);
        }
        else {
            setCheck(true);
        }

    }

    const handleClick = (user) => {
        localStorage.setItem('savedName', user);
        console.log(localStorage.getItem("savedName"));
        navigate("/mainapp")
    }

    const navigate = useNavigate()

    return (
        <div className='loginMain'>
            <h1>Animal Adoption</h1>
            <input type="text" onChange={e => handleInput(e)} />
            <button disabled={check} onClick={() => handleClick(userName)}>Zaloguj</button>
        </div>
    );
}

export default Login;