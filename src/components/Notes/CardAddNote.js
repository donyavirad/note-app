import React from 'react'
import addIcon from "../../images/add.svg"
const CardAddNote = (props) => {
  return (
    <div onClick={props.click} className='bg-slate-100 h-40 md:h-52 flex justify-center items-center lg:h-52 cursor-pointer rounded-md shadow-md '>
        <img className='w-28 h-28  md:w-40 md:h-40' src={addIcon}/>
    </div>
  )
}

export default CardAddNote