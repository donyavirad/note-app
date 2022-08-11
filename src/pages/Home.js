import React, { useEffect, useState } from 'react'
import Navbar from '../components/Header/Navbar'
import { Auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../context/modalContext'
import Modal from '../components/UI/Modal'
import { NoteProvider } from '../context/NoteContext'
import NotesControl from '../components/Notes/NotesControl'

const Home = () => {
    const { modal} = useModal()
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

    return (
        <NoteProvider>
            {loading ? (
                <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center'>
                    <div className='w-8 h-8 rounded-full border-4 border-slate-100 border-solid border-t-slate-300  animate-spin'></div>
                </div>
            ) : 
            <div className={modal ? "fixed inset-0 overflow-hidden" : null}>
                <Navbar/>
                <NotesControl/>
                <Modal/>
            </div>}
        </NoteProvider> 
    )
}

export default Home