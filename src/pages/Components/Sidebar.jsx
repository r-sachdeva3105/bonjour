import React from 'react'
import './Styles/Sidebar.css'
import SidebarHeader from './SidebarHeader'
import Search from './Search'
import ChatList from './ChatList'

const Sidebar = () => {
    return (
        <div id='Sidebar'>
            <SidebarHeader />
            <hr />
            <Search />
            <hr />
            <ChatList />
        </div>
    )
}

export default Sidebar