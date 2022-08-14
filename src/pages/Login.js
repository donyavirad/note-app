import React, { useState } from 'react'
import {FaEnvelope, FaLock} from "react-icons/fa"
import Container from '../hoc/Container'
import { Link } from "react-router-dom"
import { Auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Title from '../components/UI/Title'
import { loginPage } from '../publicData'
import Input from '../components/UI/Input'
const Login = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const loginHandler = (e) =>{
        e.preventDefault()
        setLoading(true)
        signInWithEmailAndPassword(Auth, email, password).then(() => {
            setLoading(false)
            navigate("/")
        }).catch(error => {
            setLoading(false)
            setError(error.code)
        })
    }
  return (
    <Container>
            <div className=' flex justify-center items-center w-full h-screen'>
                <div className='hidden md:block w-1/2  px-6 py-8 '>
                    <img src={loginPage.imageForm.url} className="w-full object-cover"/>
                </div>
                <div className='flex flex-col justify-center items-center w-full md:w-1/2  px-6 py-8 '>
                    <Title className="mb-5">
                        {loginPage.form.title}
                    </Title>
                    <form onSubmit={loginHandler} className='flex flex-col space-y-3 w-fit md:w-80'>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaEnvelope className='text-gray-400'/>
                            <Input 
                                elementConfig={loginPage.form.email.elementConfig}
                                className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-full'>
                            <FaLock className='text-gray-400'/>
                            <Input 
                                elementConfig={loginPage.form.password.elementConfig}
                                className='flex-grow bg-transparent text-gray-400 focus:outline-none placeholder:text-gray-300'
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <button type={"submit"} className={` p-2 rounded-full text-white text-lg ${loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600"}`} disabled={loading}>
                            {loginPage.form.buttonSubmit.text}
                        </button>
                    </form>
                    {error &&
                        <div className="mt-3 bg-red-300 p-2 rounded-md" >
                            { error === "auth/user-not-found" || error === "auth/wrong-password"  ? "Email or password is incorrect":
                            error === "auth/network-request-failed" ? "Please check your intenet and try again!": null}
                        </div>
                    }
                    <Link to={"/forgot-password"} className='text-blue-400 mt-3'>
                        {loginPage.forgotPassword.text}
                    </Link>
                    <span className='text-gray-400 text-center mt-3'>
                        {loginPage.signinPage.message}
                        <Link  to={"/signup"} className='text-blue-400'>
                            {loginPage.signinPage.buttonLink}
                        </Link>
                    </span>
                </div>
            </div>
    </Container>
  )
}

export default Login