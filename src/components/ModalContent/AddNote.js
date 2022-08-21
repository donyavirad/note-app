import React, {useState} from 'react'
import { Firestore } from '../../firebase/config'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Auth } from '../../firebase/config'
import { useModal } from '../../context/modalContext'
import { addNoteForm } from '../../publicData'
import Input from '../UI/Input'
const AddNote = () => {
    const { hideModal } = useModal()
    const [titleNote, setTitleNote] = useState("")
    const [textNote, setTextNote] = useState("")
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(false)
    const userInfo = Auth.currentUser
    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        addDoc(collection(Firestore, "users", userInfo.uid, "notes"), {
            title: titleNote,
            text: textNote,
            colorInput: colorInput,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }).then(()=>{
            hideModal()
            setColorInput("red-color")
            setLoading(false)
        }).catch((error)=>{
            console.log(error.code)
            hideModal()
            setLoading(false)
        })
    }
    const colorInputHandler =(color)=> {
        let resColor
        switch(color){
            case "red-color":
                resColor = "bg-red-300"
                break
            case "yellow-color":
                resColor = "bg-yellow-300"
                break
            case "lime-color":
                resColor = "bg-lime-300"
                break
            case "cyan-color":
                resColor = "bg-cyan-300"
                break
            case "purple-color":
                resColor = "bg-purple-300"
                break
        }

        return resColor
    }
  return (
        <div className='flex flex-col justify-between w-full  h-96 sm:w-80 bg-white p-5 rounded-md animate-newNote'>
            <h3 className='mb-4'>{addNoteForm.titleForm.text}</h3>
            <form onSubmit={submitHandler} className='flex flex-col justify-between flex-grow'>
                <Input 
                    elementType={addNoteForm.titleNote.elementType}
                    elementConfig={addNoteForm.titleNote.elementConfig}
                    value={titleNote}
                    onChange={(e) => setTitleNote(e.target.value)}
                    className=" border-2 border-blue-400 mb-2 p-1 rounded-md focus:outline-none"
                />
                <Input 
                    elementType={addNoteForm.textNote.elementType}
                    elementConfig={addNoteForm.textNote.elementConfig}
                    value={textNote}
                    onChange={(e) => setTextNote(e.target.value)}
                    className="resize-none border-2 border-blue-400 mb-2 p-1 rounded-md flex-grow focus:outline-none"
                />
                <div className='flex justify-evenly mb-2'>
                    {addNoteForm.colorNote.map((item)=>{
                        return (
                            <div className='w-8 h-8' key={item.elementConfig.id}>
                                <Input 
                                    elementConfig={item.elementConfig}
                                    className='peer hidden' 
                                    value={item.value}
                                    onChange={(e) => setColorInput(e.target.value) } 
                                    defaultChecked={item.value === "red-color"}
                                />
                                <label htmlFor={item.elementConfig.id} className={`block w-8 h-8 rounded cursor-pointer ${colorInputHandler(item.value)} peer-checked:ring-slate-600 peer-checked:ring-4`}></label>
                            </div>
                        )
                    })}
                </div>
                <button className={`w-full px-4 py-1 border border-blue-400 rounded-md transition duration-300  hover:border-transparent hover:bg-blue-600 hover:text-white ${loading ? "disabled:bg-blue-300 disabled:text-white cursor-not-allowed" : "cursor-pointer"} `} disabled={loading}>
                    {addNoteForm.submitButton.text}
                </button>
            </form>
        </div>
  )
}

export default AddNote