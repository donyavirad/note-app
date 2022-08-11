import React, { useRef, useState } from 'react'
import signupImage from "../images/signup-image.svg"
import {FaUserAlt, FaLock, FaEnvelope} from "react-icons/fa"
import Container from '../hoc/Container'
import { Link, useNavigate } from "react-router-dom"
import { Auth, Firestore } from '../firebase/config'
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Title from '../components/UI/Title'
const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const fullNameRef = useRef()
    const emailRef= useRef()
    const passwordRef= useRef()
    const addUserToDatabase = (uid) => {
        return setDoc(doc(Firestore, "users", uid), {
            fullname: fullNameRef.current.value,
            email: emailRef.current.value,
        })
    }
    const singupHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        createUserWithEmailAndPassword(Auth, emailRef.current.value, passwordRef.current.value)
        .then((userInfo) => {
            addUserToDatabase(userInfo.user.uid)
        })
        .then(()=>{
            updateProfile(Auth.currentUser, {
                displayName: fullNameRef.current.value
            })
        })
        .then(()=>{
            setLoading(false)
            navigate("/")
        })
        .catch((error) => {
            setError(error.code)
            setLoading(false)
            const errorCode = error.code
            console.log(errorCode)
        });
        
    }
  return (
    <Container>
            <div className=' flex justify-center items-center w-full h-screen'>
                <div className='hidden md:block w-1/2  px-6 py-8 '>
                    <img src={signupImage} className="w-full object-cover"/>
                </div>
                <div className='flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-8'>
                    <Title className="mb-5">
                        Sign in
                    </Title>
                    <form onSubmit={singupHandler} className='flex flex-col space-y-3 w-fit md:w-80'>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaUserAlt className='text-gray-400'/>
                            <input type={"text"} ref={fullNameRef} className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300' required id={"fuul-name-input"}  placeholder='Full Name' />
                        </div>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaEnvelope className='text-gray-400'/>
                            <input type={"email"} ref={emailRef} className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300' required id="email-input"  placeholder='Email' />
                        </div>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaLock className='text-gray-400'/>
                            <input type={"password"} ref={passwordRef} className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300' required id="password-input" placeholder='Password'/>
                        </div>
                        <button type={"submit"} className={` p-2 rounded-full text-white text-lg ${loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600"}`} disabled={loading}>
                            Sign Up
                        </button>
                    </form>
                    {error &&
                        <div className="mt-3 bg-red-300 p-2 rounded-md" >
                            { error === "auth/email-already-in-use" ? "This email has already been used.":
                            error === "auth/weak-password" ? "The password is weak.": 
                            error === "auth/network-request-failed" ? "Please check your intenet and try again!" : null}
                        </div>
                    }
                    <span className='text-gray-400 text-center mt-3'>Already have an account?
                        <Link  to={"/login"} className='text-blue-400'> Log In</Link>
                    </span>
                </div>
            </div>
    </Container>
  )
}

export default Signup