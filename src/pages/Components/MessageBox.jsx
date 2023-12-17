import React, { useContext, useEffect, useRef } from 'react'
import './Styles/MessageBox.css'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const MessageBox = ({ message }) => {

    const { currentUser } = useContext(AuthContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={ref} id='MessageBox' className={message.senderID === currentUser.uid ? 'owner' : 'sender'}>
            <div id="MessageContainer">
                {message.image && <img src={message.image} alt="" />}
                <p>{message.text}</p>
            </div>
            <span>{message.date.toDate().toLocaleTimeString()}</span>
        </div>
    )
}
export default MessageBox