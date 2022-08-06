import React, { useRef, useState } from 'react'
import formImage from "../images/image-form.jpg"
import {FaEnvelope, FaLock} from "react-icons/fa"
import Container from '../hoc/Container'
import { Link } from "react-router-dom"
import { Auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Title from '../components/UI/Title'
const Login = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const loginHandler = (e) =>{
        e.preventDefault()
        setLoading(true)
        signInWithEmailAndPassword(Auth, emailRef.current.value, passwordRef.current.value).then(() => {
            setLoading(false)
            navigate("/")
        }).catch(error => {
            setLoading(false)
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
                        Log in
                    </Title>
                    <form onSubmit={loginHandler} className='flex flex-col space-y-3 w-fit md:w-80'>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaEnvelope className='text-gray-400'/>
                            <input ref={emailRef} type={"email"} className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'  placeholder='Email' id='user-name'/>
                        </div>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaLock className='text-gray-400'/>
                            <input ref={passwordRef} type={"password"} className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'  placeholder='Password' id='password'/>
                        </div>
                        <button type={"submit"} className={`bg-emerald-300 p-2 rounded-full text-white text-lg ${loading ? "bg-emerald-200 cursor-wait" : null}`} disabled={loading}>
                            Login
                        </button>
                    </form>
                    {error &&
                        <div className="mt-3 bg-red-300 p-2 rounded-md" >
                            { error === "auth/user-not-found" || error === "auth/wrong-password"  ? "Email or password is incorrect":
                            error === "auth/network-request-failed" ? "Please check your intenet and try again!": null}
                        </div>
                    }
                    <Link to={"/forgot-password"} className='text-blue-400 mt-3'>Forgot password?</Link>
                    <span className='text-gray-400 text-center mt-3'>Need to an account?
                        <Link  to={"/signup"} className='text-blue-400'> Sign Up</Link>
                    </span>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Login