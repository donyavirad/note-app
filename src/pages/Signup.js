import React, { useState } from 'react'
import {FaUserAlt, FaLock, FaEnvelope} from "react-icons/fa"
import Container from '../hoc/Container'
import { Link, useNavigate } from "react-router-dom"
import { Auth, Firestore } from '../firebase/config'
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { signinPage } from '../publicData'
import Input from '../components/UI/Input'
import Title from '../components/UI/Title'
const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const addUserToDatabase = (uid) => {
        return setDoc(doc(Firestore, "users", uid), {
            fullname: fullName,
            email: email,
        })
    }
    const singupHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        createUserWithEmailAndPassword(Auth, email, password)
        .then((userInfo) => {
            addUserToDatabase(userInfo.user.uid)
        })
        .then(()=>{
            updateProfile(Auth.currentUser, {
                displayName: fullName
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
                    <img src={signinPage.imageForm.url} className="w-full object-cover"/>
                </div>
                <div className='flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-8'>
                    <Title className="mb-5">
                        {signinPage.form.title}
                    </Title>
                    <form onSubmit={singupHandler} className='flex flex-col space-y-3 w-fit md:w-80'>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaUserAlt className='text-gray-400'/>
                            <Input 
                                elementConfig={signinPage.form.fullName.elementConfig}
                                className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'
                                value={fullName}
                                onChange={(e)=> setFullName(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaEnvelope className='text-gray-400'/>
                            <Input 
                                elementConfig={signinPage.form.email.elementConfig}
                                className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaLock className='text-gray-400'/>
                            <Input 
                                elementConfig={signinPage.form.password.elementConfig}
                                className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <button type={"submit"} className={` p-2 rounded-full text-white text-lg ${loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600"}`} disabled={loading}>
                            {signinPage.form.buttonSubmit.text}
                        </button>
                    </form>
                    {error &&
                        <div className="mt-3 bg-red-300 p-2 rounded-md" >
                            { error === "auth/email-already-in-use" ? "This email has already been used.":
                            error === "auth/weak-password" ? "The password is weak.": 
                            error === "auth/network-request-failed" ? "Please check your intenet and try again!" : null}
                        </div>
                    }
                    <span className='text-gray-400 text-center mt-3'>{signinPage.loginPage.message}
                        <Link  to={"/login"} className='text-blue-400'>{signinPage.loginPage.buttonLink}</Link>
                    </span>
                </div>
            </div>
    </Container>
  )
}

export default Signup