import Container from '../../hoc/Container'
import React, { useEffect, useState } from 'react'
import CardAddNote from './CardAddNote'
import NoteItem from './NoteItem'
import { Firestore } from '../../firebase/config'
import { Auth } from '../../firebase/config'
import { onSnapshot, query, orderBy, collection } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth'
import AddNote from '../ModalContent/AddNote'
import EditNote from '../ModalContent/EditNote'
import Modal from '../UI/Modal'
import { useSelector } from 'react-redux/es/exports'
import Title from '../UI/Title'
const Notes = () => {
    const contentModal = useSelector((state) => state.modal.modalContent)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        onAuthStateChanged(Auth, user => {
            if(user){
                const noteRef = query(collection(Firestore, "users", user.uid, "data"), orderBy("createdAt", "desc"))
                setLoading(true)
                setTimeout(()=>{
                    onSnapshot(noteRef, (snap)=>{
                        const res = []
                        snap.forEach((item)=>{
                            res.push({id: item.id , ...item.data()})
                        })
                        setData(res)
                        setLoading(false)
                    },(error)=> {
                        console.log(error)
                    })
                },300)
            }
        })
        return () => {
            setData(null)
        }
    }, [])
    const loadingNotes = () => {
        const loads = []
        for(let i = 0; i< 14; i++) {
            loads.push((
                <div key={i} className='flex bg-slate-200 p-4 h-40 md:h-52 rounded-md animate-pulse' ></div>
            ))
        }
        const res = loads.map((item) => {
            return item
        })
        return res
    }
  return (
    <Container>
        <div className='flex flex-col'>
            <Title className="py-8">
                Notes
            </Title>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  '>
                <CardAddNote />
                {loading ? loadingNotes()
                     : null
                }
                {data && data.length === 0 ? 
                <div className='flex justify-center items-center p-4 text-center text-slate-600 border-4 border-dashed h-40 md:h-52 rounded-md'>
                    You have no notes.
                    Add a note.
                </div>
                : null}
                {data && data.map((item) => {
                    return <NoteItem key={item.id} id={item.id} note={item.data} color={item.colorInput}/>
                })}
                
            </div>
        </div>
        <Modal>
            {contentModal === "add-note-content" ? <AddNote/> :
            contentModal === "edit-note-content" ?  <EditNote /> : null}
        </Modal>
    </Container>
  )
}

export default Notes