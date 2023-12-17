import React, { useContext } from 'react'
import './Styles/ChatBoxHeader.css'
import { ChatContext } from '../Context/ChatContext';

const ChatBoxHeader = () => {

    const { data } = useContext(ChatContext);

    return (
        <div id='ChatBoxHeader'>
            <div className="HeaderLeft">
                {data?.user?.photoURL && <img src={data?.user?.photoURL} alt="profile" id='avatar' />}
                <h3>{data?.user?.displayName}</h3>
            </div>
            <div className="HeaderRight">
                <i className="fa-solid fa-phone"></i>
                <i className="fa-solid fa-video"></i>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
        </div>
    )
}

export default ChatBoxHeader