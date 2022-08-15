import React, {useState, useEffect} from 'react'
import { getDoc, doc, updateDoc, deleteDoc,serverTimestamp } from 'firebase/firestore'
import { Auth, Firestore } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNote } from '../../context/NoteContext'
import { useModal } from '../../context/modalContext'
import Input from '../UI/Input'
import { editNoteForm } from '../../publicData'
const EditNote = () => {
    const { noteId } = useNote()
    const { hideModal } = useModal()
    const [titleNote, setTitleNote] = useState("")
    const [textNote, setTextNote] = useState("")
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(null)
    useEffect(()=>{
        if(noteId){
            setLoading("content-load")
            onAuthStateChanged(Auth, user => {
                getDoc(doc(Firestore,"users", user.uid, "notes", noteId)).then((res)=>{
                   const result = res.data()
                   setTitleNote(result.title)
                   setTextNote(result.text)
                   setColorInput(result.colorInput)
                   setLoading(false)
               }).catch((error)=> console.log(error))
            })
        }
    }, [noteId])

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading("edit-submit")
        onAuthStateChanged(Auth, user => {
            const updateQuery = doc(Firestore ,"users", user.uid, "notes", noteId)
            updateDoc(updateQuery, {
                title: titleNote,
                text: textNote,
                colorInput: colorInput,
                updatedAt: serverTimestamp(),
            }).then(()=> {
                console.log("edited")
                hideModal()
            })
        })
    }
    const changeHandler = (e) => {
            setColorInput(e.target.value)
    }
    const deleteHandler = () =>{
        setLoading("delete-submit")
        deleteDoc(doc(Firestore, "users" ,Auth.currentUser.uid, "notes", noteId)).then(()=>{
            hideModal()
        }).catch((error)=> console.log(error))
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

    let res = null
    if(loading === "content-load") {
        res = (
            <div className='flex justify-center items-center w-full h-96 sm:w-80 bg-white p-5 rounded-md'>
                <div className='w-8 h-8 rounded-full border-4 border-slate-100 border-solid border-t-slate-300  animate-spin'></div>
            </div>
        )
    }else{
        res =
        (<div className='flex flex-col justify-between w-full h-96 sm:w-80 bg-white p-5 rounded-md'>
            <h3 className='mb-4'>
                {editNoteForm.titleForm.text}
            </h3>
            <form onSubmit={submitHandler} className='flex flex-col justify-between flex-grow'>
                <Input 
                    elementType={editNoteForm.titleNote.elementType}
                    elementConfig={editNoteForm.titleNote.elementConfig}
                    value={titleNote}
                    onChange={(e) => setTitleNote(e.target.value)}
                    className=" border-2 border-blue-400 mb-2 p-1 rounded-md focus:outline-none"
                />
                <Input 
                    elementType={editNoteForm.textNote.elementType}
                    elementConfig={editNoteForm.textNote.elementConfig}
                    className="resize-none border-2 border-blue-400 mb-2 p-1 rounded-md focus:outline-none flex-grow"
                    defaultValue={textNote}
                    onChange={(e) => setTextNote(e.target.value)}
                />
                <div className='flex justify-evenly mb-2'>
                    {editNoteForm.colorNote.map((item) => {
                        return (
                            <div className='w-8 h-8' key={item.elementConfig.id}>
                                <Input 
                                    elementConfig={item.elementConfig}
                                    className='peer hidden'  
                                    onChange={changeHandler} 
                                    value={item.value}
                                    defaultChecked={colorInput === item.value}/>
                                <label htmlFor={item.elementConfig.id} className={`block w-8 h-8 rounded cursor-pointer ${colorInputHandler(item.value)}  peer-checked:ring-slate-600 peer-checked:ring-4`}></label>
                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-between space-x-4'>
                    <button type="button" onClick={deleteHandler} className={`w-full px-4 py-1 border border-red-400 rounded-md transition duration-300 hover:border-transparent hover:bg-red-600 hover:text-white ${loading === "delete-submit" ? "disabled:bg-red-300 disabled:text-white cursor-not-allowed" : null}`} disabled={loading}>
                        {editNoteForm.deleteButton.text}
                    </button>
                    <button type="submit" className={`w-full px-4 py-1 border border-blue-400 rounded-md transition duration-300 hover:border-transparent hover:bg-blue-600 hover:text-white ${loading === "edit-submit" ? "disabled:bg-blue-300 disabled:text-white cursor-not-allowed" : null} `} disabled={loading}>
                        {editNoteForm.editButton.text}
                    </button>
                </div>
            </form>
        </div>)
    }
    
  return res

}

export default EditNote