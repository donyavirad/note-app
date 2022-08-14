import React, { useState } from 'react'
import {FaEnvelope} from "react-icons/fa"
import Container from '../hoc/Container'
import { Link } from "react-router-dom"
import { Auth } from '../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import Title from '../components/UI/Title'
import  Input  from '../components/UI/Input'
import { forgotPasswordData } from '../publicData'
const ForgotPassword = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sucessMessage , setSucessMessage]= useState(null)
    const [email, setEmail] = useState("")
    const resetPasswordHandler = (e) =>{
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSucessMessage(null)
        sendPasswordResetEmail(Auth, email).then(() => {
            setLoading(false)
            setSucessMessage(true)
        }).catch(error => {
            setLoading(false)
            setError(error.code)
        })
    }
  return (
    <Container>
            <div className=' flex justify-center items-center  w-full h-screen'>
                <div className='hidden md:block w-1/2  px-6 py-8 '>
                    <img src={forgotPasswordData.imageForm.url} className="w-full object-cover"/>
                </div>
                <div className='flex flex-col justify-center items-center w-full md:w-1/2  px-6 py-8 '>
                    <Title className="mb-5">
                        {forgotPasswordData.form.title}
                    </Title>
                    <form onSubmit={resetPasswordHandler} className='flex flex-col space-y-3 w-fit md:w-80'>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaEnvelope className='text-gray-400'/>
                            <Input 
                                elementConfig={forgotPasswordData.form.email.elementConfig}
                                className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <button type={"submit"} className={` p-2 rounded-full text-white text-lg ${loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600"}`} disabled={loading}>
                            {forgotPasswordData.form.buttonSubmit.text}
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
                            {forgotPasswordData.successfulMessage}
                        </div>
                    }
                    <Link to={"/login"} className='text-blue-400 mt-3'>{forgotPasswordData.closeLink}</Link>
                </div>
            </div>
    </Container>
  )
}

export default ForgotPassword