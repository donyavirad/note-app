import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import { Firestore } from '../../firebase/config'
import { Auth } from '../../firebase/config'
import { onSnapshot, query, orderBy, collection } from "firebase/firestore"
import poorConnectionImage from "../../images/poor-connection.svg"
import noDataImage from "../../images/no-data.svg"
const Notes = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
        const noteRef = query(collection(Firestore, "users", Auth.currentUser.uid, "data"), orderBy("createdAt", "desc"))
        setLoading(true)
        setError(false)
        setRefresh(false)
        const unsubscribe = onSnapshot(noteRef , { includeMetadataChanges: true },(snap) => {
            if(!snap.metadata.hasPendingWrites){
                if(!snap.metadata.fromCache){
                    const res = []
                    snap.forEach((item)=>{
                        res.push({id: item.id , ...item.data()})
                    })
                    setError(false)
                    setData(res)
                    setLoading(false)
                }else {
                    setLoading(false)
                    setError(true)
                }
            }
        })
        return () => {
            unsubscribe()
            setData(null)
        }
    }, [refresh])

    const showData = () => {
        let showdata = []
        data && data.map((item) => {
            showdata.push( <NoteItem key={item.id} id={item.id} note={item.data} color={item.colorInput}/>)
        })
        const res = showdata.map((item) => {
            return item
        })
        return (
            <div  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  '>
                {res}
            </div>
        )
    }

    const noData = () => {
        let nodata = ""
        if(data && data.length === 0) {
            nodata =
            <div className='flex flex-col items-center md:flex-row border-4 border-dashed border-gray-300 p-8  rounded-md'>
                <img src={noDataImage} className="w-1/2 h-fit md:h-80"/>
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-8 md:m-0">
                    <h3 className='text-2xl'>
                        You have no notes!
                    </h3>
                    <span className='text-slate-600'>
                        Add your notes.
                    </span>
                </div>
            </div>
        }
        return nodata
    }
    
    const loadingNotes = () => {
        const loads = []
        for(let i = 0; i< 15; i++) {
            loads.push((
                <div key={i} className='flex bg-slate-200 p-4 h-40 md:h-52 rounded-md animate-pulse' ></div>
            ))
        }
        const res = loads.map((item) => {
            return item
        })
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  '>
                {res}
            </div>
        )
    }
    const errorContent = () => {
        return (
            <div className='flex flex-col items-center md:flex-row border-4 border-dashed border-gray-300 p-8  rounded-md'>
                <img src={poorConnectionImage} className="w-1/2 h-fit md:h-80"/>
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-8 md:m-0">
                    <h3 className='text-2xl'>
                        Oooops!
                    </h3>
                    <span className='text-slate-600'>
                        Poor connection.
                        <span className='text-blue-400 cursor-pointer' onClick={() => setRefresh(true)}>
                            Try again!
                        </span>
                    </span>
                </div>
            </div>
        )
    }
    const showContent = () => {
        let content = null
        if(data) {
            content = showData()
            if(data.length === 0) {
                content = noData()
            }
        }
        if(loading){
            content = loadingNotes()
        }
        if(error) {
            content = errorContent()
        }
        return content
    }

    
    return (
        <div>
            {showContent()}
        </div>
    )
}

export default Notes