import React from 'react'
import logo from "../../images/logo.svg"
import smalLogo from "../../images/small-logo.svg"
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
        <Link to={"/"}>
            <img className='h-10 hidden md:block' src={logo}/>
            <img className='h-10 md:hidden' src={smalLogo}/>
        </Link>
  )
}

export default Logo