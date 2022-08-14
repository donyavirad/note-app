import React from 'react'
import { FaPlusCircle } from "react-icons/fa"
import { useModal } from '../../context/modalContext'
import { notesData } from '../../publicData'
const AddNote = () => {
    const {showModal} = useModal()
    const showModalHandler = () =>{
        showModal("add-note-content")
    }
    return (
        <div onClick={showModalHandler} className='flex items-center space-x-2  cursor-pointer'>
            <FaPlusCircle className='w-6 h-6 text-gray-400'/>
            <span className='hidden md:block text-2xl text-gray-400'>
                {notesData.addNote.textButton}
            </span>
        </div>
    )
}

export default AddNote