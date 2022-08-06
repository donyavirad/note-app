import React from 'react'
import Header from '../components/Header/Header'
import Container from '../hoc/Container'
import Title from '../components/UI/Title'
import image404 from "../images/404.png"
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <React.Fragment>
    <Header/>
    <Container>
        <div className=' flex flex-col justify-center items-center mt-4'>
            <div className=' flex justify-center items-center  w-full '>
                <div className='hidden md:block w-1/2  px-6 py-8 '>
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
    </React.Fragment>
  )
}

export default PageNotFound