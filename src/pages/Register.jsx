import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import './Styles/Register.css'

const Register = () => {

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [fileError, setFileError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        if (!name) {
            setNameError('Name Required!');
        } else if (name.length < 3) {
            setNameError('Name must have atleast 3 characters')
        } else {
            setNameError('');
        }

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

        if (!file) {
            setFileError('Profile Avatar Required!');
        } else {
            setFileError('');
        }

        if (name && email && password && file) {

            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);

                    const metadata = {
                        contentType: 'image/jpeg'
                    };

                    const storageRef = ref(storage, 'avatar/' + name);
                    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                        },
                        (error) => {
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    setError('storage/unauthorized');
                                    break;
                                case 'storage/canceled':
                                    setError('storage/canceled');
                                    break;
                                case 'storage/unknown':
                                    setError('storage/unknown');
                                    break;
                                default:
                                    break
                            }
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                await updateProfile(user, {
                                    displayName: name,
                                    photoURL: downloadURL
                                });
                                await setDoc(doc(db, "users", user.uid), {
                                    uid: user.uid,
                                    name,
                                    email,
                                    photoURL: downloadURL
                                });
                                await setDoc(doc(db, "userChats", user.uid), {});
                            });
                            navigate('/');
                        },
                    );
                })
                .catch((error) => {
                    const errorCode = error.code;
                    setError(errorCode);
                });
        }


    }
    return (
        <div id='Register'>
            <h1>bonjour!</h1>
            <h3>Register</h3>
            <form id='RegisterForm' method='post' action="" onSubmit={handleRegistration}>
                <input type="text" name="name" id="name" placeholder="Enter name *" />
                {nameError && <h5>{nameError}</h5>}
                <input type="email" name="email" id="email" placeholder="Enter email *" />
                {emailError && <h5>{emailError}</h5>}
                <input type="password" name="password" id="password" placeholder="Enter password *" />
                {passError && <h5>{passError}</h5>}
                <input type="file" name="avatar" id="addAvatar" accept="image/*" />
                <label htmlFor="addAvatar"><i className="fa-solid fa-image"></i>Add avatar *</label>
                {fileError && <h5>{fileError}</h5>}
                <input type="submit" value="Sign up" id="signup" />
                {error && <h5>{error}</h5>}
            </form>
            <h4>Already have an account? <Link to='/login'>Login</Link></h4>
        </div >
    )
}

export default Register