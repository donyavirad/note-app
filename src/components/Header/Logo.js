import React from 'react'
import { Link } from 'react-router-dom'
import { headerData } from '../../publicData'
const Logo = () => {
  return (
        <Link to={"/"}>
            <img className='h-10 hidden md:block' src={headerData.logo.largeLogo.url}/>
            <img className='h-10 md:hidden' src={headerData.logo.smallLogo.url}/>
        </Link>
  )
}

export default Logo