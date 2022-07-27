import React from 'react'

const NoteItem = (props) => {
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
    <div className={`${color} p-4 h-52 rounded-md shadow-md`} >
        <div className='h-full overflow-hidden'>
            <p className='line-clamp-7 '>
                {props.note}
            </p>
        </div>
    </div>
  )
}

export default NoteItem