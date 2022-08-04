import React from 'react'
import addIcon from "../../images/add.svg"
import { showModal, addModalContent } from '../UI/ModalSlice'
import { useDispatch } from 'react-redux/es/exports'
const CardAddNote = () => {
    const dispatch = useDispatch()
    const showModalHandler = () =>{
        dispatch(showModal())
        dispatch(addModalContent())
    }
  return (
    <div onClick={showModalHandler} className='bg-slate-100 h-40 md:h-52 flex justify-center items-center lg:h-52 cursor-pointer rounded-md shadow-md '>
        <img className='w-28 h-28  md:w-40 md:h-40' src={addIcon}/>
    </div>
  )
}

export default CardAddNote