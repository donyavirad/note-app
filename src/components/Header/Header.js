import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Profile from './Profile'
import Container  from '../../hoc/Container'
import { Auth } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
const Header = () => {
    const [showProfile, setProfile] =useState(false)
    useEffect(()=>{
        onAuthStateChanged(Auth, (user) => {
            if(user) {
                setProfile(true)
            } else {
                setProfile(false)
            }
        })
        
    }, [])
  return (
    <div className='shadow-lg'>
        <Container>
            <div className='flex justify-between items-center py-2 md:py-4 '>
                <Logo/>
                {showProfile ? <Profile/> : null}
            </div>
        </Container>
    </div>
  )
}

export default Header