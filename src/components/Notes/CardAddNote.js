import React from 'react'
import addIcon from "../../images/add.svg"
import { useModal } from '../../context/modalContext'
const CardAddNote = () => {
    const {showModal} = useModal()
    const showModalHandler = () =>{
        showModal("add-note-content")
    }
    return (
        <div onClick={showModalHandler} className='bg-slate-100 h-40 md:h-52 flex justify-center items-center lg:h-52 cursor-pointer rounded-md shadow-md '>
            <img className='w-28 h-28  md:w-40 md:h-40' src={addIcon}/>
        </div>
    )
}

export default CardAddNote