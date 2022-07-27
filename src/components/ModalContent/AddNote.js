import React, {useState, useRef} from 'react'
import Modal from '../UI/Modal'
import useAddDoc from '../../hooks/useAddDoc'
const AddNote = (props) => {
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(false)
    const textarea = useRef()
    const addDoc  = useAddDoc()
    
    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = textarea.current.value
        addDoc("notes", {data, colorInput}).then(()=>{
            props.click()
            setColorInput("red-color")
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
    <Modal show={props.modal} click={props.click}>
        <h3 className='mb-4'>Add your NOTE!</h3>
        <form onSubmit={submitHandler} className='flex flex-col'>
            <textarea ref={textarea} autoFocus cols="40" rows="10" className="border-2 border-blue-400 mb-2 rounded-md focus:outline-none" required></textarea>
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
    </Modal>
  )
}

export default AddNote