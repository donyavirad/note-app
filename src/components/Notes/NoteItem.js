import React from 'react'
import { useNote } from '../../context/NoteContext'
import { useModal } from '../../context/modalContext'
import { FaPen } from 'react-icons/fa'

const NoteItem = (props) => {
    const {showModal} = useModal()
    const { setId } = useNote()
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
    const timeHandler = (time) => {
        const unixTime = new Date(time * 1000)
        let hour = unixTime.getHours()
        let minutes = unixTime.getMinutes()
        const numberDay = unixTime.getDate()
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        const monthIndex = unixTime.getMonth()
        if(hour < 10) {
            hour = `0${hour}`
        }
        if(minutes < 10) {
            minutes = `0${minutes}`
        }
        const today = new Date().getDate()
        if(numberDay === today) {
            return (`${hour}:${minutes} Today`)
        }
        return (`${hour}:${minutes} ${numberDay} ${monthNames[monthIndex]}`)
    }
  return (
    <div className={` group p-4 h-40 md:h-52 ${color} rounded-md shadow-md animate-newNote`} >
        <div className='relative flex flex-col h-full'>
            <div className='flex flex-col h-full overflow-hidden'>
                <h4 className='text-slate-600 line-clamp-1 text-lg font-bold'>
                    {props.title}
                </h4>
                <p className='flex-grow line-clamp-3 md:line-clamp-5  text-slate-500'>
                    {props.text}
                </p>
                <span className=' text-slate-400'>
                    {timeHandler(props.date.seconds)}
                </span>
            </div>
            <div className="group-edit absolute bottom-0 right-0 bg-slate-600 p-2 rounded-full cursor-pointer animate-editNoteEnd group-hover:animate-editNote "
                onClick={() => {
                    showModal("edit-note-content")
                    setId(props.id)
                }}>
                <FaPen className="text-white transition group-edit-hover:text-orange-300"/>
            </div>
        </div>
    </div>
  )
}

export default NoteItem