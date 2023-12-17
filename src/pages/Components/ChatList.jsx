import React, { useState, useEffect, useContext } from 'react'
import './Styles/ChatList.css'
import { AuthContext } from "../Context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { ChatContext } from '../Context/ChatContext';

const ChatList = () => {

    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {

        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();

    }, [currentUser.uid])

    const handleSelect = (user) => {
        dispatch({ type: "changeUser", payload: user })
    }

    return (
        <div id='ChatList'>
            {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date)?.map((chat) => (

                <div className="chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo?.photoURL} alt="profile" id='profile' />
                    <div>
                        <h4>{chat[1].userInfo?.displayName}</h4>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default ChatList