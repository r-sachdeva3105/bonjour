import React, { useContext, useState } from 'react'
import './Styles/SidebarHeader.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../Context/AuthContext'

const SidebarHeader = () => {

    const { currentUser } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const handleMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }
    return (
        <div id='SidebarHeader'>
            <h3>bonjour {currentUser.displayName}!</h3>
            <div className="menu">
                <img src={currentUser.photoURL} alt="profile" id='profile' onClick={handleMenu} />
                {showMenu && <button id='logout' onClick={() => signOut(auth)}>Logout</button>}
            </div>
        </div>
    )
}

export default SidebarHeader