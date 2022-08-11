import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Profile from './Profile'
import Container  from '../../hoc/Container'
const Navbar = () => {
  return (
    <div className='border-b-2 border-solid border-gray-300'>
        <Container>
            <div className='flex justify-between items-center py-4 '>
                <Logo/>
                <Profile/>
            </div>
        </Container>
    </div>
  )
}

export default Navbar