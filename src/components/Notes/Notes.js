import Container from '../../hoc/Container'
import React, { useEffect, useState } from 'react'
import CardAddNote from './CardAddNote'
import NoteItem from './NoteItem'
import { Firestore } from '../../firebase/config'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import AddNote from '../ModalContent/AddNote'
import EditNote from '../ModalContent/EditNote'
import Modal from '../UI/Modal'
const Notes = () => {
    const [data, setData] = useState()
    const [modal, setModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)
    const [ediData, setEditData] = useState(null)
    useEffect(()=>{
        const noteRef = query(collection(Firestore, "notes"), orderBy("createdAt", "desc"))
        onSnapshot(noteRef, (snap)=>{
            const res = []
            snap.forEach((item)=>{
                res.push({id: item.id , ...item.data()})
            })
            setData(res)
        },(error)=> {
            console.log(error)
        })
    }, [])
    const addNoteHandler = ()=>{
        setContentModal("add-note-content")
    }

  return (
    <Container>
        <div className='flex flex-col'>
            <h2 className='mb-5'>Notes:</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  '>
                <CardAddNote click={ ()=>{
                     setModal(true)
                     addNoteHandler()
                }}/>
                {data && data.map((item) => {
                    return <NoteItem key={item.id} id={item.id} note={item.data} color={item.colorInput} click={()=> setModal(true)} edit={setEditData} setModalContent={setContentModal}/>
                })}
                
            </div>
        </div>
        <Modal show={modal} click={() => setModal(false)}>
            {contentModal === "add-note-content" ? <AddNote click={() => setModal(false)}/> :
            contentModal === "edit-note-content" ?  <EditNote editId={ediData} click={() => setModal(false)}/> : null}
             
             {/*  */}
        </Modal>
    </Container>
  )
}

export default Notes