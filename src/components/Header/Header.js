import React from 'react'
import Logo from './Logo'
import Profile from './Profile'
import Container  from '../../hoc/Container'

const Header = () => {
  return (
    <Container>
        <div className='flex justify-between items-center py-4 '>
            <Logo/>
            <Profile/>
        </div>
    </Container>
  )
}

export default Header