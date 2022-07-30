import React, {useState, useRef} from 'react'
import { Firestore } from '../../firebase/config'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const AddNote = (props) => {
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(false)
    const textarea = useRef()

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = textarea.current.value
        addDoc(collection(Firestore, "notes"), {
            data: data,
            colorInput: colorInput,
            createdAt: serverTimestamp(),
        }).then(()=>{
            props.click()
            setColorInput("red-color")
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
        <div className='flex flex-col justify-between  h-96 w-80 bg-white p-5 rounded-md'>
            <h3 className='mb-4'>Add your NOTE!</h3>
            <form onSubmit={submitHandler} className='flex flex-col justify-between flex-grow'>
                <textarea ref={textarea} autoFocus className="border-2 border-blue-400 mb-2 rounded-md flex-grow focus:outline-none" required></textarea>
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
                <button className={`px-4 py-1 border border-blue-400 rounded-md ${loading ? "border-blue-100 cursor-not-allowed" : null} `} disabled={loading}>add</button>
            </form>
        </div>
  )
}

export default AddNote