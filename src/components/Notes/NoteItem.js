import React, { useState } from 'react'
import other from "../../images/other.svg"
import { Firestore, Auth } from '../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNote } from '../../context/NoteContext'
import { useModal } from '../../context/modalContext'
const NoteItem = (props) => {
    const {showModal} = useModal()
    const {setId} = useNote()
    const [options, setOptions] = useState(false)
    let color = ''
    switch(props.color){
        case "red-color":
            color = "bg-red-300"
            break
        case "yellow-color":
            color = "bg-yellow-300"
            break
        case "lime-color":
            color = "bg-lime-300"
            break
        case "cyan-color":
            color = "bg-cyan-300"
            break
        case "purple-color":
            color = "bg-purple-300"
            break
    }
    const deleteHandler = () =>{
        deleteDoc(doc(Firestore, "users" ,Auth.currentUser.uid, "data", props.id)).then(()=>{
            console.log("deleted sucessful")
        }).catch((error)=> console.log(error))
    }
  return (
    <div className={`${color}  flex flex-col p-4 h-40 md:h-52 rounded-md shadow-md`} >
        <div className='relative self-end'>
            <img onClick={() => setOptions(true)} className=' w-6 h-6' src={other}/>

            {options ?
            <div onClick={() => setOptions(false)} className='fixed w-full h-full right-0 top-0 z-10'></div>
        : null }

            <div className={`absolute right-0 top-full bg-slate-100 bg-opacity-50 backdrop-blur-md rounded-md transition  origin-top z-20 ${options ? "scale-100" : "scale-y-0"}`}>
                <ul className='py-2 ring-1 ring-slate-300 ring-opacity-50 rounded-md '>
                    <li onClick={() => {
                        showModal("edit-note-content")
                        setOptions(false)
                        setId(props.id)
                    }} className='px-2 py-1 transition hover:bg-white hover:bg-opacity-70 cursor-pointer'>Edit</li>
                    <li onClick={deleteHandler} className='px-2 py-1 transition hover:bg-white hover:bg-opacity-70 cursor-pointer'>Delete</li>
                </ul>
            </div>
        </div>
        <div className='h-full overflow-hidden'>
            <p className='line-clamp-5 md:line-clamp-6'>
                {props.note}
            </p>
        </div>
    </div>
  )
}

export default NoteItem