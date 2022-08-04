import React, {useState, useRef, useEffect} from 'react'
import { Firestore } from '../../firebase/config'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { hideModal } from '../UI/ModalSlice'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Auth } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
const EditNote = () => {
    const dispatch = useDispatch()
    const editId = useSelector((state) => state.notes.editId)
    const [textarea, setTextarea] = useState("")
    const [colorInput, setColorInput] = useState("red-color")
    const [loading, setLoading] = useState(false)
    const textareaRef = useRef()
    useEffect(()=>{
        if(editId){
            setLoading(true)
            onAuthStateChanged(Auth, user => {
                getDoc(doc(Firestore,"users", user.uid, "data", editId)).then((res)=>{
                   const result = res.data()
                   setTextarea(result.data)
                   setColorInput(result.colorInput)
                   setLoading(false)
               }).catch((error)=> console.log(error))
            })
        }
    }, [editId])

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = textareaRef.current.value
        onAuthStateChanged(Auth, user => {
            const updateQuery = doc(Firestore ,"users", user.uid, "data", editId)
            updateDoc(updateQuery, {
                colorInput: colorInput,
                data: data
            }).then(()=> {
                console.log("edited")
                dispatch(hideModal())
            })
        })
    }
    const changeHandler = (e) => {
            setColorInput(e.target.value)
    }
    let res = null
    if(loading) {
        res = (
            <div className='flex justify-center items-center h-96 w-80 bg-white p-5 rounded-md'>
                <div className='w-8 h-8 rounded-full border-4 border-slate-100 border-solid border-t-slate-300  animate-spin'></div>
            </div>
        )
    }else{
        res =
        (<div className='flex flex-col justify-between  h-96 w-80 bg-white p-5 rounded-md'>
            <h3 className='mb-4'>Edit NOTE</h3>
            <form onSubmit={submitHandler} className='flex flex-col justify-between flex-grow'>
                <textarea ref={textareaRef} autoFocus  className="border-2 border-blue-400 mb-2 rounded-md focus:outline-none flex-grow" required defaultValue={textarea}></textarea>
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
                <button className={`px-4 py-1 border border-blue-400 rounded-md ${loading ? "border-blue-100 cursor-not-allowed" : null} `} disabled={loading}>Edit</button>
            </form>
        </div>)
    }
    
  return res

}

export default EditNote