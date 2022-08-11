import React, {useState, useRef} from 'react'
import { Firestore } from '../../firebase/config'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Auth } from '../../firebase/config'
import { useModal } from '../../context/modalContext'
const AddNote = () => {
    const { hideModal } = useModal()
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(false)
    const textarea = useRef()
    const userInfo = Auth.currentUser
    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = textarea.current.value
        addDoc(collection(Firestore, "users", userInfo.uid, "data"), {
            data: data,
            colorInput: colorInput,
            createdAt: serverTimestamp(),
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
  return (
        <div className='flex flex-col justify-between w-full  h-96 sm:w-80 bg-white p-5 rounded-md'>
            <h3 className='mb-4'>Add your NOTE!</h3>
            <form onSubmit={submitHandler} className='flex flex-col justify-between flex-grow'>
                <textarea ref={textarea} autoFocus className="resize-none border-2 border-blue-400 mb-2 rounded-md flex-grow focus:outline-none"  placeholder='Write your note...' required></textarea>
                <div className='flex justify-evenly mb-2'>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={(e) => setColorInput(e.target.value)} type={"radio"} name="color-input" value="red-color" id='color-1' defaultChecked/>
                        <label htmlFor='color-1' className='block w-8 h-8 rounded cursor-pointer bg-red-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={(e) => setColorInput(e.target.value)} type={"radio"} name="color-input" value="yellow-color" id='color-2'/>
                        <label htmlFor='color-2' className='block w-8 h-8 rounded cursor-pointer bg-yellow-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={(e) => setColorInput(e.target.value)} type={"radio"} name="color-input" value="lime-color" id='color-3'/>
                        <label htmlFor='color-3' className='block w-8 h-8 rounded cursor-pointer bg-lime-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div>
                        <input className='peer hidden' onChange={(e) => setColorInput(e.target.value)} type={"radio"} name="color-input" value="cyan-color" id='color-4'/>
                        <label htmlFor='color-4' className='block w-8 h-8 rounded cursor-pointer bg-cyan-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                    <div className='w-8 h-8'>
                        <input className='peer hidden' onChange={(e) => setColorInput(e.target.value)} type={"radio"} name="color-input" value="purple-color" id='color-5'/>
                        <label htmlFor='color-5' className='block w-8 h-8 rounded cursor-pointer bg-purple-300 peer-checked:ring-slate-600 peer-checked:ring-4 '></label>
                    </div>
                </div>
                <button className={`w-full px-4 py-1 border border-blue-400 rounded-md transition duration-300  hover:border-transparent hover:bg-blue-600 hover:text-white ${loading ? "disabled:bg-blue-300 disabled:text-white cursor-not-allowed" : "cursor-pointer"} `} disabled={loading}>add</button>
            </form>
        </div>
  )
}

export default AddNote