import React from 'react'
import { FaPlusCircle } from "react-icons/fa"
import { useModal } from '../../context/modalContext'
const AddNote = () => {
    const {showModal} = useModal()
    const showModalHandler = () =>{
        showModal("add-note-content")
    }
    return (
        <div onClick={showModalHandler} className='flex items-center space-x-2  cursor-pointer'>
            <FaPlusCircle className='w-6 h-6 text-gray-400'/>
            <span className='text-2xl text-gray-400'>
                Add note
            </span>
        </div>
    )
}

export default AddNote