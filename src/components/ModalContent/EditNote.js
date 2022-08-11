import React, {useState, useRef, useEffect} from 'react'
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { Auth, Firestore } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNote } from '../../context/NoteContext'
import { useModal } from '../../context/modalContext'
const EditNote = () => {
    const { noteId } = useNote()
    const { hideModal } = useModal()
    const [textarea, setTextarea] = useState("")
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(null)
    const textareaRef = useRef()
    useEffect(()=>{
        if(noteId){
            setLoading("content-load")
            onAuthStateChanged(Auth, user => {
                getDoc(doc(Firestore,"users", user.uid, "data", noteId)).then((res)=>{
                   const result = res.data()
                   setTextarea(result.data)
                   setColorInput(result.colorInput)
                   setLoading(false)
               }).catch((error)=> console.log(error))
            })
        }
    }, [noteId])

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading("edit-submit")
        const data = textareaRef.current.value
        onAuthStateChanged(Auth, user => {
            const updateQuery = doc(Firestore ,"users", user.uid, "data", noteId)
            updateDoc(updateQuery, {
                colorInput: colorInput,
                data: data
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
        deleteDoc(doc(Firestore, "users" ,Auth.currentUser.uid, "data", noteId)).then(()=>{
            hideModal()
        }).catch((error)=> console.log(error))
    }
    let res = null
    if(loading === "content-load") {
        res = (
            <div className='flex justify-center items-center h-96 w-80 bg-white p-5 rounded-md'>
                <div className='w-8 h-8 rounded-full border-4 border-slate-100 border-solid border-t-slate-300  animate-spin'></div>
            </div>
        )
    }else{
        res =
        (<div className='flex flex-col justify-between w-full h-96 sm:w-80 bg-white p-5 rounded-md'>
            <h3 className='mb-4'>Edit NOTE</h3>
            <form onSubmit={submitHandler} className='flex flex-col justify-between flex-grow'>
                <textarea ref={textareaRef} autoFocus  className="resize-none border-2 border-blue-400 mb-2 rounded-md focus:outline-none flex-grow" required defaultValue={textarea}></textarea>
                <div className='flex justify-evenly mb-2'>
                    <div className='w-8 h-8'>
                        <input className='peer hidden'  onChange={changeHandler} type={"radio"} name="color-input" value="red-color" id='color-1' defaultChecked={colorInput === "red-color"}/>
                        <label htmlFor='color-1' className='block w-8 h-8 rounded cursor-pointer bg-red-300 peer-checked:ring-slate-600 peer-checked:ring-4'></label>
                    </div>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={changeHandler} type={"radio"} name="color-input" value="yellow-color" id='color-2'  defaultChecked={colorInput === "yellow-color"}/>
                        <label htmlFor='color-2' className='block w-8 h-8 rounded cursor-pointer bg-yellow-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={changeHandler} type={"radio"} name="color-input" value="lime-color" id='color-3' defaultChecked={colorInput === "lime-color"}/>
                        <label htmlFor='color-3' className='block w-8 h-8 rounded cursor-pointer bg-lime-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div>
                        <input className='peer hidden' onChange={changeHandler} type={"radio"} name="color-input" value="cyan-color" id='color-4' defaultChecked={colorInput === "cyan-color"} />
                        <label htmlFor='color-4' className='block w-8 h-8 rounded cursor-pointer bg-cyan-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={changeHandler} type={"radio"} name="color-input" value="purple-color" id='color-5' defaultChecked={colorInput === "purple-color"}/>
                        <label htmlFor='color-5' className='block w-8 h-8 rounded cursor-pointer bg-purple-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                </div>
                <div className='flex justify-between space-x-4'>
                    <button type="button" onClick={deleteHandler} className={`w-full px-4 py-1 border border-red-400 rounded-md transition duration-300 hover:border-transparent hover:bg-red-600 hover:text-white ${loading === "delete-submit" ? "disabled:bg-red-300 disabled:text-white cursor-not-allowed" : null}`} disabled={loading} >delete</button>
                    <button type="submit" className={`w-full px-4 py-1 border border-blue-400 rounded-md transition duration-300 hover:border-transparent hover:bg-blue-600 hover:text-white ${loading === "edit-submit" ? "disabled:bg-blue-300 disabled:text-white cursor-not-allowed" : null} `} disabled={loading}>Edit</button>
                </div>
            </form>
        </div>)
    }
    
  return res

}

export default EditNote