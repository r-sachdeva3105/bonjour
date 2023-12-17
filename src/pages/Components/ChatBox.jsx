import React from 'react'
import './Styles/ChatBox.css'
import Messages from './Messages'
import InputBox from './InputBox'
import ChatBoxHeader from './ChatBoxHeader'

const ChatBox = () => {
    return (
        <div id='ChatBox'>
            <ChatBoxHeader />
            <Messages />
            <InputBox />
        </div>
    )
}

export default ChatBox