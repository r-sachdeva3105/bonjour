import React from 'react'
import Sidebar from './Components/Sidebar'
import './Styles/Home.css'
import ChatBox from './Components/ChatBox'

const Home = () => {
    return (
        <div id="Home">
            <Sidebar />
            <ChatBox />
        </div>
    )
}

export default Home