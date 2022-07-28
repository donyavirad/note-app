import React, { useState } from 'react'
import other from "../../images/other.svg"
import Firebase from '../../firebase/config'
import { getFirestore, deleteDoc, doc } from 'firebase/firestore'
const NoteItem = (props) => {
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
        const db = getFirestore(Firebase)
        deleteDoc(doc(db,"notes", props.id)).then(()=>{
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

            <div className={`absolute right-0 top-full bg-slate-100 bg-opacity-50 backdrop-blur-md rounded-md transition  origin-top z-20 overflow-hidden ${options ? "scale-100" : "scale-y-0"}`}>
                <ul className='py-1'>
                    <li className='px-3 py-2 cursor-pointer'>Edit</li>
                    <li onClick={deleteHandler} className='px-3 py-2 cursor-pointer'>Delete</li>
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