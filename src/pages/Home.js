import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Notes from '../components/Notes/Notes'
import { Auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        onAuthStateChanged(Auth,(user)=> {
            if(user) {
                setLoading(false)
            }else{
                navigate("/login")
            }
        })
    }, [])
    console.log("ok")
  return (
    
        loading ? (
            <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center'>
                <div className='w-8 h-8 rounded-full border-4 border-slate-100 border-solid border-t-slate-300  animate-spin'></div>
            </div>
        ) : 
        <div>
            <Header/>
            <Notes/>
        </div>
        
        
  )
}

export default Home