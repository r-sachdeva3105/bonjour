import React, { useState } from 'react'
import './Styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!email) {
            setEmailError('Email Required!');
        } else {
            setEmailError('');
        }

        if (!password) {
            setPassError('Password Required!');
        } else if (password.length < 8) {
            setPassError('Password must have atleast 8 characters')
        } else {
            setPassError('');
        }

        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    setError(errorCode);
                });
        }
    }

    return (
        <div id='Login'>
            <h1>bonjour!</h1>
            <h3>Login</h3>
            <form id='LoginForm' method='post' action="" onSubmit={handleLogin}>
                <input type="email" name="email" id="email" placeholder="Enter email *" />
                {emailError && <h5>{emailError}</h5>}
                <input type="password" name="password" id="password" placeholder="Enter password *" />
                {passError && <h5>{passError}</h5>}
                <input type="submit" value="Login" id="login" />
                {error && <h5>{error}</h5>}
            </form>
            <h4>Don't have an account? <Link to='/register'>Sign up</Link></h4>
        </div>
    )
}

export default Login