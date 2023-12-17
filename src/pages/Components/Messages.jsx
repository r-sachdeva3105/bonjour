import React, { useContext, useState, useEffect } from 'react'
import './Styles/Messages.css'
import MessageBox from './MessageBox'
import { ChatContext } from '../Context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Messages = () => {

    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub();
        }
    }, [data.chatID])


    return (
        <div id='Messages'>
            {messages.map(m => (
                <MessageBox message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages