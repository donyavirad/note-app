import React, { useState } from 'react'
import profile from "../../images/profile.png"
const Profile = () => {
    const [showMenu, setShowMenu] = useState(false)
  return (
    <div className='relative'>
        <img onClick={() => setShowMenu(true)} className='w-12 h-12' src={profile}/>
        {showMenu ?
            <div onClick={() => setShowMenu(false)} className='fixed w-full h-full right-0 top-0 z-10'></div>
        : null }
        
        <div className={`absolute top-full right-0 bg-slate-100 bg-opacity-50 backdrop-blur-md p-3 rounded-md transition translate-y-2 z-20 ${showMenu ? "scale-100": "scale-y-0"} origin-top   `}>
            <ul>
                <li className='mb-2'>
                    <a href='/index'>HamedDonyavi</a> 
                </li>
                <li className='mb-2'><a href='/ops'>Edit Profile</a></li>
                <li>Log out</li>
            </ul>
        </div>
    </div>
  )
}

export default Profile