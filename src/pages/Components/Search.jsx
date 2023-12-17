import React, { useContext, useState } from 'react'
import './Styles/Search.css'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from "../Context/AuthContext";

const Search = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    // const [error, setError] = useState('');

    const { currentUser } = useContext(AuthContext);

    const handleKey = (e) => {
        e.code === "Enter" && searchUser();
    }

    const searchUser = async () => {
        const q = query(collection(db, "users"), where("name", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUser(doc.data());
        });
    }

    const handleSelect = async () => {
        const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        const res = await getDoc(doc(db, "chats", combinedID));
        console.log(res);
        if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedID), { messages: [] });

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedID + ".userInfo"]: {
                    uid: user.uid,
                    name: user.name,
                    photoURL: user.photoURL,
                },
                [combinedID + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedID + ".userInfo"]: {
                    uid: currentUser.uid,
                    name: currentUser.name,
                    photoURL: currentUser.photoURL,
                },
                [combinedID + ".date"]: serverTimestamp(),
            });
        }

        setUser(null);
        setUsername('');
    }

    return (
        <div id='Search'>
            <div id="SearchInput">
                <input
                    type="text"
                    name="userSearch"
                    id="UserInput"
                    placeholder="Find a user"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={handleKey} />
            </div>
            {user && <div id="SearchResult" onClick={handleSelect}>
                <img src={user.photoURL} alt="profile" id='profile' />
                <div>
                    <h4>{user.name}</h4>
                </div>
            </div>}
        </div>
    )
}

export default Search