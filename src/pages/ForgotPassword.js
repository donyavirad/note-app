import React, { useRef, useState } from 'react'
import formImage from "../images/image-form.jpg"
import {FaEnvelope} from "react-icons/fa"
import Container from '../hoc/Container'
import { Link } from "react-router-dom"
import { Auth } from '../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Title from '../components/UI/Title'
const ForgotPassword = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sucessMessage , setSucessMessage]= useState(null)
    const emailRef = useRef()
    const navigate = useNavigate()
    const resetPasswordHandler = (e) =>{
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSucessMessage(null)
        sendPasswordResetEmail(Auth, emailRef.current.value).then(() => {
            setLoading(false)
            setSucessMessage(true)
        }).catch(error => {
            setLoading(false)
            console.log(error.code)
            setError(error.code)
        })
    }
  return (
    <Container>
        <div className=' flex flex-col justify-center items-center mt-4'>
            <div className=' flex justify-center items-center  w-full '>
                <div className='hidden md:block w-1/2  px-6 py-8 '>
                    <img src={formImage} className="w-full object-cover"/>
                </div>
                <div className='flex flex-col justify-center items-center w-full md:w-1/2  px-6 py-8 '>
                    <Title className="mb-5">
                        Reset password
                    </Title>
                    <form onSubmit={resetPasswordHandler} className='flex flex-col space-y-3 w-fit md:w-80'>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaEnvelope className='text-gray-400'/>
                            <input ref={emailRef} type={"email"} className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'  placeholder='Email' id='user-name' required/>
                        </div>
                        <button type={"submit"} className={`bg-emerald-300 p-2 rounded-full text-white text-lg ${loading ? "bg-emerald-200 cursor-wait" : null}`} disabled={loading}>
                            send
                        </button>
                    </form>
                    {error &&
                        <div className="mt-3 bg-red-300 p-2 rounded-md" >
                            { error === "auth/user-not-found" ? "Email not found":
                            error === "auth/network-request-failed" ? "Please check your intenet and try again!": null}
                        </div>
                    }
                    {sucessMessage &&
                        <div className="mt-3 bg-green-300 p-2 rounded-md" >
                            Email sent successfully.
                        </div>
                    }
                    <Link to={"/login"} className='text-blue-400 mt-3'>Cansel</Link>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ForgotPassword