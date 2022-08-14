import React from 'react'
import { useNote } from '../../context/NoteContext'
import { useModal } from '../../context/modalContext'
import { FaPen } from 'react-icons/fa'
const NoteItem = (props) => {
    const {showModal} = useModal()
    const {setId} = useNote()
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
   
  return (
    <div className={` group p-4 h-40 md:h-52 ${color} rounded-md shadow-md`} >
        <div className='relative flex flex-col h-full'>
            <div className="scale-0 group-edit absolute bottom-0 right-0 bg-slate-600 p-2 rounded-full cursor-pointer transition group-hover:scale-100"
                onClick={() => {
                    showModal("edit-note-content")
                    setId(props.id)
                }}>
                <FaPen className="text-white transition group-edit-hover:text-orange-300"/>
            </div>
            <div className='h-full overflow-hidden'>
                <p className='line-clamp-5 md:line-clamp-6'>
                    {props.note}
                </p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem