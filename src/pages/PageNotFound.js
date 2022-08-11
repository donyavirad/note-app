import React from 'react'
import Container from '../hoc/Container'
import Title from '../components/UI/Title'
import image404 from "../images/404.svg"
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <Container>
        <div className=' flex justify-center items-center h-screen'>
            <div className=' flex flex-col md:flex-row justify-center items-center  w-full '>
                <div className=' w-full md:w-1/2  px-6 py-8 '>
                    <img src={image404} className="w-full object-cover"/>
                </div>
                <div className='flex flex-col justify-center items-center w-full md:w-1/2  px-6 py-8 '>
                    <Title className="mb-5">
                        Page not found!
                    </Title>

                    <Link to={"/"} className='text-blue-400 mt-3'>Back home</Link>
                    
                </div>
            </div>
        </div>
    </Container>
  )
}

export default PageNotFound