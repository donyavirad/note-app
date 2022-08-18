import React, { useEffect, useState} from 'react'
import { Auth, Storage } from '../../firebase/config'
import { updateProfile, updateEmail, updatePassword} from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { FaRegUserCircle, FaUpload, FaPen } from "react-icons/fa"
import Compressor from 'compressorjs'
import { useModal } from '../../context/modalContext'
const EditProfile = () => {
    const {hideModal} = useModal()
    const user = Auth.currentUser
    const [image, setImage] = useState(user.photoURL)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(0)

    const [displayName, setDisplayName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const uploadImageProfileHandler = (e) => {
        const file = e.target.files[0]
        new Compressor(file, {
            quality: 0.6,
            success: (compressedResult) => {
                const storageRef = ref(Storage, `private/users/${user.uid}`)
                const uploadTask = uploadBytesResumable(storageRef, compressedResult)
                console.log(compressedResult)
                uploadTask.on("state_changed",
                    (snapshot) => {
                        const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        setUploading(Math.round(progress))
                    }, (error) => {
                        console.log(error)
                    },() => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImage(downloadURL)
                            updateProfile(user, {
                                photoURL: downloadURL,
                            })
                        })
                    })        

            },
        })
    }

    useEffect(()=> {
        setImage(user.photoURL)
    }, [user.photoURL])

    const submitHandler =(e) => {
        e.preventDefault()
        const promises = []
        const result = []
        setError(null)
        setLoading(true)
        if(!(displayName === user.displayName)){
            promises.push(updateProfile(user, {
                    displayName: displayName,
                }))
        }
        if(!(email === user.email)){
            promises.push(
                updateEmail(user, email)
            )
        }
        if(!(password === '') && (password === confirmPassword)) {
            promises.push(
                updatePassword(user, password)
            )
        }
        if(!(displayName === user.displayName) ||
            !(email === user.email) ||
            !(password === '') && (password === confirmPassword)){
                Promise.all(promises.map((promiseItem)=>{
                    return promiseItem
                    .then(()=>{
                        result.push("success")
                    })
                    .catch((error) => {
                        setError(error.code)
                        result.push("error")
                        console.log(error.code)
                    })
                })).then(()=>{
                    setLoading(false)
                    const isError = result.find((item)=>{
                        return item === "error"
                    })
                    if(!isError){
                        hideModal()
                    }
                    console.log(result,isError)
                })
        }else{
            setLoading(false)
        }
        
    }
  return (
    <div className='flex flex-col w-full sm:w-80 bg-white p-5 rounded-md animate-newNote'>
            <h3 className='mb-4'>
                Edit profile
            </h3>
            <div className=' flex items-center justify-between '>
                <div className=''>
                    {user.photoURL ? <img 
                        src={image} 
                        className="w-14 h-14 object-cover rounded-md" /> 
                    : <FaRegUserCircle className=' w-14 h-14 text-gray-400 '/> }
                </div>
                <input id='image-profile' onChange={uploadImageProfileHandler} type={"file"} accept=".jpg, .jpeg, .png" className='hidden'/>
                <label htmlFor='image-profile' className='flex items-center bg-blue-600 text-white rounded-md px-4 py-1 cursor-pointer'>
                    <FaUpload className='mr-2'/>
                    Upload image
                </label>
            </div>

            <div style={{width: `${uploading}%`}} className={`transition-all h-1 bg-blue-400 mt-2 origin-top ${uploading == 100 ? "scale-0 " : null}`}></div>

            <form onSubmit={submitHandler} className='flex flex-col justify-between mt-4'>
                <div>
                    <label htmlFor='full-name-input' className='text-blue-400'>
                        Full name
                    </label>
                    <input type={"text"} id={"full-name-input"} value={displayName} onChange={(e) => setDisplayName(e.target.value)} required className=" border-2 border-blue-400 w-full mb-2 p-1 rounded-md focus:outline-none"/>
                </div>
                <div>
                    <label htmlFor='email-input' className='text-blue-400'>
                        Email
                    </label>
                    <input type={"email"} id={"email-input"} value={email} onChange={(e) => setEmail(e.target.value)} required className=" border-2 border-blue-400 w-full mb-2 p-1 rounded-md focus:outline-none"/>
                </div>
                <div>
                    <label htmlFor='password-input' className='text-blue-400'>
                        password (If you do not want to change the password, leave it blank)
                    </label>
                    <input type={"password"}  id={"password-input"} value={password} onChange={(e) => setPassword(e.target.value)} className=" border-2 border-blue-400 w-full mb-2 p-1 rounded-md focus:outline-none"/>
                </div>
                <div>
                    <label htmlFor='confirm-password-input' className='text-blue-400'>
                        Confirm password
                    </label>
                    <input type={"password"} id={"confirm-password-input"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className=" border-2 border-blue-400 w-full mb-2 p-1 rounded-md focus:outline-none"/>
                </div>

                <div className='mt-2'>
                    <button type="submit" className={`flex justify-center items-center w-full px-4 py-1 border-2 border-blue-400 rounded-md transition duration-300 hover:border-transparent hover:bg-blue-600 hover:text-white ${loading ? "disabled:bg-blue-300 disabled:text-white cursor-not-allowed" : null} `} disabled={loading}>
                        <FaPen className='mr-2'/> 
                        Edit profile
                    </button>
                </div>
            </form>
            {error ? 
                <div className='mt-3 bg-red-300 p-2 rounded-md'>
                    {error === "auth/weak-password" ? "The password is weak." :
                     error === "auth/invalid-email" ? "The email is not valid." :
                     error === "auth/network-request-failed" ? "Please check your intenet and try again!" : null}
                </div>
            : null
            }
        </div>
  )
}

export default EditProfile