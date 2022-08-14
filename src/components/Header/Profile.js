import React, { useState } from 'react'
import { Auth } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { headerData } from '../../publicData';
const Profile = () => {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

    const LogoutHandler = () => {
        signOut(Auth).then(()=>{
            navigate("/login")
        })
    }
  return (
    <div className='relative'>
        <FaRegUserCircle onClick={() => setShowMenu(true)} className='w-8 h-8 text-gray-400 cursor-pointer'/>
        {showMenu ?
            <div onClick={() => setShowMenu(false)} className='fixed w-full h-full right-0 top-0 z-10'></div>
        : null }
        
        <div className={`absolute top-full right-0 bg-slate-100 bg-opacity-50 backdrop-blur-md rounded-md transition translate-y-2 z-20 ${showMenu ? "scale-100": "scale-y-0"} origin-top   `}>
            <ul className='w-32 py-2 ring-1 ring-slate-300 ring-opacity-50 rounded-md' >
                <li className=' px-2 py-1 transition border-b-2 border-solid border-slate-300 border-opacity-50'>
                    <span className='block truncate'>
                        {Auth.currentUser.displayName}
                    </span> 
                    <span className='block text-slate-600 truncate'>
                        {Auth.currentUser.email}
                    </span>
                </li>
                <li className=' px-2 py-1 cursor-pointer transition hover:bg-white hover:bg-opacity-70 '>
                    {headerData.profile.profileOptions.editProfile.text}
                </li>
                <li onClick={LogoutHandler} className={"px-2 py-1 transition hover:bg-white hover:bg-opacity-70  cursor-pointer"}>
                    {headerData.profile.profileOptions.logOut.text}
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Profile