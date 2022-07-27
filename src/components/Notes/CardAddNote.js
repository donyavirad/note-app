import React from 'react'

const CardAddNote = (props) => {
  return (
    <div onClick={props.click} className='bg-slate-100 h-40 flex justify-center items-center lg:h-52 cursor-pointer rounded-md shadow-md '>
        <button className=' w-10 h-10 border border-red-400 rounded-full text-red-400'>+</button>
    </div>
  )
}

export default CardAddNote