import React from 'react'
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
        <Link to={"/"}>
            <img className='w-52' src={logo}/>
        </Link>
  )
}

export default Logo